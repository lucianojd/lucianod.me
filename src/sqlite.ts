import path from 'node:path';
import sqlite3 from 'sqlite3';

export class SqliteGlobalError extends Error {
  constructor(
    message: string,
    public readonly originalError?: Error,
  ) {
    super(`sqlite: ${message}`);
    this.name = 'SqliteGlobalError';
  }
}

sqlite3.verbose();

export default class SqliteGlobal {
  private static db: sqlite3.Database;

  constructor() {
    const filePath =
      process.env.SQLITE_PATH ?? path.join(process.cwd(), 'data/app.db');

    if (SqliteGlobal.db == undefined) {
      SqliteGlobal.db = new sqlite3.Database(filePath, (err) => {
        if (err) {
          throw new SqliteGlobalError('failed to connect: ', err);
        }
      });

      SqliteGlobal.db.exec(
        `
                    CREATE TABLE IF NOT EXISTS apod (
                        id VARCHAR(10) PRIMARY KEY NOT NULL,
                        type VARCHAR(10) NOT NULL,
                        object TEXT NOT NULL
                    )
                `,
        (err) => {
          if (err) {
            throw new SqliteGlobalError(
              'failed to create database apod: ',
              err,
            );
          }
        },
      );
    }
  }

  getInstance() {
    if (SqliteGlobal.db == undefined) {
      throw new SqliteGlobalError('Database instance is not initialized.');
    }
    return SqliteGlobal.db;
  }
}
