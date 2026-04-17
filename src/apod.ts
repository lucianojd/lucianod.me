import { Cache } from '@src/interfaces/cache.interface';
import axios from 'axios';
import { NASA } from '@src/constants';
import { NasaMedia } from './types/apod';
import { getStandardFromDate, validateStandardDate } from './utils';

let instance: APODServer | null = null;

export default class APODServer {
  private cache: Cache;
  private constructor(cache: Cache) {
    this.cache = cache;
  }

  static async getInstance(cache: Cache): Promise<APODServer> {
    if (!instance) {
      instance = new APODServer(cache);
      await instance.connect(cache);
    }
    return instance;
  }

  async connect(cache: Cache) {
    if (!this.cache) {
      this.cache = cache;
    }

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

  static async getAPODRange(offset: number, count: number): Promise<string[]> {
    return [];
  }
}
