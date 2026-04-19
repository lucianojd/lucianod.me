import { Cache } from '@src/interfaces/cache.interface';
import axios from 'axios';
import { NASA } from '@src/constants';
import { NasaMedia } from './types/apod';
import {
  getDateRange,
  getStandardFromDate,
  validateStandardDate,
} from './utils';
import { Server } from './interfaces/server.interface';

let instance: APODServer | null = null;

export class APODServerFactory {
  static async create(cache: Cache): Promise<APODServer> {
    if (!instance) {
      instance = new APODServer(cache);
      await instance.connect();
    }
    return instance;
  }
}

export class APODServer implements Server {
  private cache: Cache;
  public constructor(cache: Cache) {
    this.cache = cache;
  }

  async connect() {
    if (!this.cache.isConnected()) {
      await this.cache.connect();
    }
  }

  isConnected(): boolean {
    if (!this.cache) return false;
    return this.cache.isConnected();
  }

  createKey(date: string | Date): string {
    if (typeof date === 'string') {
      if (!validateStandardDate(date))
        throw new Error('Invalid date format. Expected YYYY-MM-DD');

      return `apod:${date}`;
    } else {
      return `apod:${getStandardFromDate(date)}`;
    }
  }

  compareKeys(key1: string, key2: string): boolean {
    return key1 === key2;
  }

  async getAPOD(date: string | Date): Promise<NasaMedia> {
    // Verify cache is connected.
    if (!this.cache)
      throw new Error('Cache not initialized. Call connect() first.');

    const key = this.createKey(date);
    const cached = await this.cache.get<string>(key);

    if (cached) {
      this.cache.refresh(key);
      return JSON.parse(cached) as NasaMedia;
    } else {
      const data = await axios
        .get<NasaMedia>(NASA.API_URL, {
          params: {
            api_key: NASA.API_KEY,
            date: date,
          },
        })
        .then((res) => res.data);

      const nasaMedia: NasaMedia = data as NasaMedia;
      await this.cache.set(key, JSON.stringify(nasaMedia));
      return nasaMedia;
    }
  }

  private retriveFromCache = async (
    date: string,
  ): Promise<NasaMedia | null> => {
    const key = this.createKey(date);
    return this.cache.get<string>(key).then((cached) => {
      if (cached) {
        this.cache.refresh(key);
        return JSON.parse(cached) as NasaMedia;
      }
      return null;
    });
  };

  async getAPODRange(
    offset: number,
    count: number,
  ): Promise<NasaMedia[] | null> {
    const dates = getDateRange(offset, count);
    console.log({
      offset,
      count,
      dates,
    });

    const startDate = dates[dates.length - 1];
    const endDate = dates[0];

    let data: NasaMedia[] | undefined = await Promise.all(
      dates.map((date) => this.retriveFromCache(date)),
    ).then((cachedData) => {
      const missingDates = dates.filter(
        (_, index) => cachedData[index] === null,
      );
      console.log({ missingDates });
      if (missingDates.length === 0) {
        return cachedData as NasaMedia[];
      }
      return undefined;
    });

    data ??= await axios
      .get<NasaMedia[]>(NASA.API_URL, {
        params: {
          api_key: NASA.API_KEY,
          start_date: startDate,
          end_date: endDate,
        },
      })
      .then((res) => {
        const responseData = res.data as NasaMedia[];

        console.log({ responseData });

        for (const media of responseData) {
          const key = this.createKey(media.date);
          this.cache.set(key, JSON.stringify(media));
        }

        return responseData;
      });

    return data ?? null;
  }
}
