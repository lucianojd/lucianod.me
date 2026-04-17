import { RedisClientType, createClient } from 'redis';
import type { Cache } from '@src/interfaces/cache.interface';

const DEFAULT_TTL_SECONDS = 60 * 60 * 24; // 24 hours

export class RedisService implements Cache {
  private client: RedisClientType;

  public constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });

    this.client.on('error', (err) =>
      console.error('redis-service: error creating client: ', err),
    );

    this.client.on('connect', () =>
      console.info('redis-service: client is connecting to Redis...'),
    );

    this.client.on('ready', () =>
      console.info('redis-service: client is ready to use Redis'),
    );

    this.client.on('end', () =>
      console.info('redis-service: client connection to Redis has ended'),
    );

    this.client.on('reconnecting', () =>
      console.info('redis-service: client is reconnecting to Redis...'),
    );
  }

  public isConnected(): boolean {
    return this.client.isOpen;
  }

  public async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  public async disconnect() {
    if (this.client.isOpen) {
      await this.client.close();
    }
  }

  public async get<E>(key: string | number): Promise<E | null> {
    const value = await this.client.get(String(key));

    if (value) {
      console.info(`redis-service: cache hit for key: ${key}`);
      const parsedValue = JSON.parse(value) as E;
      return parsedValue;
    }

    return null;
  }

  public async set<E>(
    key: string | number,
    value: E,
    ttl: number = DEFAULT_TTL_SECONDS,
  ) {
    console.info(
      `redis-service: setting cache for key: ${key} with ttl: ${ttl}`,
    );
    await this.client.set(String(key), JSON.stringify(value), {
      EX: ttl, // Set expiration time in seconds if provided
    });
  }

  public async refresh(
    key: string | number,
    ttl: number = DEFAULT_TTL_SECONDS,
  ) {
    console.info(`redis-service: refreshing cache for key: ${key}`);
    await this.client.touch(String(key)); // Refresh TTL to 60 seconds
  }
}
