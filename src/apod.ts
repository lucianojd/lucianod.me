import axios from 'axios';
import { NASA } from '@src/constants';
import { NasaMedia } from '@src/types/apod';
import { getDateRange } from '@src/utils';
import { readApod, writeApod } from '@src/firebase';
import {
  HTTPBadRequest,
  HTTPInternalServerError,
} from '@src/utils/http/error-responses';
import {
  HTTPNoDataFoundAtSpecifiedOffset,
  HTTPNoDataFoundForDate,
} from '@src/utils/http/apod-responses';
import { NextResponse } from 'next/dist/server/web/spec-extension/response';

let instance: APODServer | null = null;

export class APODServerFactory {
  static async create(): Promise<APODServer> {
    if (!instance) {
      instance = new APODServer();
    }
    return instance;
  }
}

export class APODServerError extends NextResponse {}

export class APODServer {
  public constructor() {}

  async getAPOD(limit: number = 25): Promise<NasaMedia[] | undefined> {
    try {
      const cachedData = await readApod(0, limit);
      const today = new Date().toISOString().split('T')[0];

      if (cachedData?.length === limit && cachedData[0]?.date === today) {
        return cachedData;
      }
    } catch {
      // Fall back to NASA if Firebase is unavailable.
    }

    const params = {
      api_key: NASA.API_KEY,
    };

    try {
      const response = await axios.get(NASA.API_URL, { params });

      switch (response.status) {
        case 200:
          writeApod(response.data as NasaMedia).catch(() => {
            // Ignore write errors, as we still want to return the data.
          });
          return response.data as NasaMedia[];
        case 400:
          throw HTTPBadRequest({
            message: 'Invalid request to NASA API.',
            limit: limit,
          });
        case 404:
          throw HTTPNoDataFoundAtSpecifiedOffset(0, limit);
        default:
          throw HTTPInternalServerError({
            message: `Unexpected response.`,
            limit: limit,
          });
      }
    } catch (err) {
      if (err instanceof APODServerError) {
        throw err;
      }
      throw HTTPInternalServerError({
        message: `Unexpected error occurred.`,
        limit: limit,
      });
    }
  }

  async getAPODByDate(date: string | Date) {
    return new Promise<NasaMedia | undefined>((resolve, reject) => {
      const params = {
        api_key: NASA.API_KEY,
        date: date,
      };

      axios
        .get(NASA.API_URL, { params })
        .then((response) => {
          switch (response.status) {
            case 200:
              return resolve(response.data as NasaMedia);
            case 400:
              return reject(
                HTTPBadRequest({
                  message: `Invalid request for date: ${date}`,
                  date: date,
                }),
              );
            case 404:
              return reject(
                HTTPNoDataFoundForDate(
                  typeof date === 'string'
                    ? date
                    : date.toISOString().split('T')[0],
                ),
              );
            default:
              return reject(
                HTTPInternalServerError({
                  message: `Unexpected response.`,
                  date: date,
                }),
              );
          }
        })
        .catch(() => {
          return reject(
            HTTPInternalServerError({
              message: `Unexpected error occurred.`,
              date: date,
            }),
          );
        });
    });
  }

  async getAPODRange(
    offset: number,
    count: number,
  ): Promise<NasaMedia[] | undefined> {
    return new Promise<NasaMedia[] | undefined>((resolve, reject) => {
      const dates = getDateRange(offset, count);

      if (dates.length === 0) return resolve([]);

      const startDate = dates[dates.length - 1];
      const endDate = dates[0];

      axios
        .get<NasaMedia[]>(NASA.API_URL, {
          params: {
            api_key: NASA.API_KEY,
            start_date: startDate,
            end_date: endDate,
          },
        })
        .then((response) => {
          const nasaMedia: NasaMedia[] | undefined = response.data as
            NasaMedia[] | undefined;

          switch (response.status) {
            case 200:
              return resolve(nasaMedia);
            case 400:
              return reject(
                HTTPBadRequest({ message: `Invalid request.`, dates: dates }),
              );
            case 404:
              return reject(HTTPNoDataFoundAtSpecifiedOffset(0, count));
            default:
              return reject(
                HTTPInternalServerError({
                  message: `Unexpected response.`,
                  dates: dates,
                }),
              );
          }
        })
        .catch(() => {
          return reject(
            HTTPInternalServerError({
              message: `Unexpected error occurred.`,
              dates: dates,
            }),
          );
        });
    });
  }
}
