import { RedisService } from '@src/redis';
import axios from 'axios';
import { NASA } from '@src/constants';
import { NasaMedia } from './types/apod';
import { getStandardFromDate, validateStandardDate } from './utils';

export function createKey(date: string | Date): string {
  if (typeof date === 'string') {
    if (!validateStandardDate(date))
      throw new Error('Invalid date format. Expected YYYY-MM-DD');

    return `apod:${date}`;
  } else {
    return `apod:${getStandardFromDate(date)}`;
  }
}

export function compareKeys(key1: string, key2: string): boolean {
  return key1 === key2;
}

export class APODServer {
  static async getAPOD(date: string | Date): Promise<NasaMedia> {
    const redis = await RedisService.getInstance();
    const key = createKey(date);
    const cached = await redis.get<string>(key);

    if (cached) {
      return JSON.parse(cached);
    } else {
      const result = await axios.get(NASA.API_URL, {
        params: {
          api_key: NASA.API_KEY,
          date: date,
        },
      });

      const nasaMedia: NasaMedia = result.data as NasaMedia;
      await redis.set(key, JSON.stringify(nasaMedia), 24 * 60 * 60);
      return nasaMedia;
    }
  }

  static async getAPODRange(offset: number, count: number): Promise<string[]> {
    return [];
  }
}
