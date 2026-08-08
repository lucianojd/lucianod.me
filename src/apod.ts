import axios from 'axios';
import { NASA } from '@src/constants';
import { NasaMedia, APODModel } from '@src/types/apod';
import { getDateRange, getStandardFromDate } from '@src/utils';
import SqliteGlobal, { SqliteGlobalError } from '@src/sqlite';

let instance: APODServer | null = null;

export class APODServerFactory {
  static async create(): Promise<APODServer> {
    if (!instance) {
      instance = new APODServer();
    }
    return instance;
  }
}

export class APODServerError extends Error {
  constructor(
    message: string,
    public readonly originalError?: Error,
  ) {
    super(`APODServer: ${message}`);
    this.name = 'APODServerError';
  }
}

export class APODServer {
  private db: SqliteGlobal | undefined = undefined;

  public constructor() {
    if (this.db == undefined) {
      try {
        this.db = new SqliteGlobal();
      } catch (err: SqliteGlobalError | Error | unknown) {
        if (err instanceof SqliteGlobalError) {
          throw new APODServerError(`APODServer: ${err.message}`, err);
        } else if (err instanceof Error) {
          throw new APODServerError(`APODServer: ${err.message}`, err);
        } else {
          throw new APODServerError(
            'APODServer: Unknown error occurred during database connection',
            undefined,
          );
        }
      }
    }
  }

  async getAPOD(date: string | Date) {
    return new Promise<NasaMedia | undefined>((resolve, reject) => {
      const db = this.db?.getInstance();

      if (db) {
        db.get<APODModel>(
          `SELECT * FROM apod WHERE id = ?`,
          [getStandardFromDate(date)],
          async (err, row) => {
            if (err) {
              return reject(
                new APODServerError('failed to query database apod: ', err),
              );
            }

            const dbRow: NasaMedia | undefined = row
              ? JSON.parse(row.object)
              : undefined;

            if (dbRow) {
              return resolve(dbRow);
            } else {
              const params = {
                api_key: NASA.API_KEY,
                date: date,
              };

              const response = await axios.get(NASA.API_URL, { params });
              let nasaMedia: NasaMedia | undefined = undefined;

              switch (response.status) {
                case 200:
                  nasaMedia = response.data as NasaMedia;
                  db.run(
                    `INSERT INTO apod (id, type, object) VALUES (?, ?, ?)`,
                    [
                      nasaMedia.date,
                      nasaMedia.media_type,
                      JSON.stringify(nasaMedia),
                    ],
                    (err) => {
                      if (err) {
                        return reject(
                          new APODServerError(
                            'failed to insert data into database apod: ',
                            err,
                          ),
                        );
                      } else {
                        return resolve(nasaMedia);
                      }
                    },
                  );
                  break;
                case 400:
                  return reject(
                    new APODServerError(
                      `invalid request to NASA API: ${response.status} ${response.statusText}`,
                    ),
                  );
                case 404:
                  return reject(
                    new APODServerError(
                      `data not found in NASA API: ${response.status} ${response.statusText}`,
                    ),
                  );
                default:
                  return reject(
                    new APODServerError(
                      `failed to fetch data from NASA API: ${response.status} ${response.statusText}`,
                    ),
                  );
              }
            }
          },
        );
      } else {
        return reject(
          new APODServerError('Database instance is not initialized.'),
        );
      }
    });
  }

  async getAPODRange(
    offset: number,
    count: number,
  ): Promise<NasaMedia[] | undefined> {
    return new Promise<NasaMedia[] | undefined>((resolve, reject) => {
      const dates = getDateRange(offset, count);

      if (dates.length === 0) {
        return resolve([]);
      }

      const db = this.db?.getInstance();

      if (db) {
        const placeholders = dates.map(() => '?').join(',');
        const sql = `SELECT * FROM apod WHERE id IN (${placeholders})`;
        const params = dates;

        db.all<APODModel>(sql, params, async (err, rows) => {
          if (err) {
            return reject(
              new APODServerError('failed to query database apod: ', err),
            );
          }

          const dbRows: NasaMedia[] = rows.map((row) => JSON.parse(row.object));

          if (dbRows.length === dates.length) {
            return resolve(dbRows);
          } else {
            const startDate = dates[dates.length - 1];
            const endDate = dates[0];

            const response = await axios.get<NasaMedia[]>(NASA.API_URL, {
              params: {
                api_key: NASA.API_KEY,
                start_date: startDate,
                end_date: endDate,
              },
            });

            const nasaMedia: NasaMedia[] | undefined = response.data as
              NasaMedia[] | undefined;
            const placeholders = dates.map(() => '(?, ?, ?)').join(',');
            const sql = `INSERT OR REPLACE INTO apod (id, type, object) VALUES ${placeholders}`;
            const params =
              nasaMedia
                ?.map((item) => [
                  item.date,
                  item.media_type,
                  JSON.stringify(item),
                ])
                .flat() ?? [];

            switch (response.status) {
              case 200:
                db.run(sql, params, (err) => {
                  if (err) {
                    return reject(
                      new APODServerError(
                        'failed to insert data into database apod: ',
                        err,
                      ),
                    );
                  } else {
                    return resolve(nasaMedia);
                  }
                });
                break;
              case 400:
                return reject(
                  new APODServerError(
                    `invalid request to NASA API: ${response.status} ${response.statusText}`,
                  ),
                );
              case 404:
                return reject(
                  new APODServerError(
                    `data not found in NASA API: ${response.status} ${response.statusText}`,
                  ),
                );
              default:
                return reject(
                  new APODServerError(
                    `failed to fetch data from NASA API: ${response.status} ${response.statusText}`,
                  ),
                );
            }
          }
        });
      } else {
        return reject(
          new APODServerError('Database instance is not initialized.'),
        );
      }
    });
  }
}
