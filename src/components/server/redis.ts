/* eslint-disable no-console */
import { RedisClientType, createClient } from 'redis';

export class RedisService {
  private static instance: RedisService;
  private client: RedisClientType;

  private constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });

    this.client.on('error', (err) =>
      console.error('redis-service: error creating client: ', err),
    );
  }

  public static async getInstance(): Promise<RedisService> {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();

      await RedisService.instance.client.connect();

      if (RedisService.instance.client.isOpen) {
        console.log('redis-service: successfully connected to Redis');
      } else {
        console.error('redis-service: failed to connect to Redis');
      }
    }
    return RedisService.instance;
  }

  public async get<E>(key: string | number): Promise<E | null> {
    const value = await this.client.get(String(key));

    if (value) {
      console.log(`redis-service: cache hit for key: ${key}`);
      const parsedValue = JSON.parse(value) as E;
      return parsedValue;
    }

    return null;
  }

  public async set<E>(key: string | number, value: E, ttl?: number) {
    console.log(
      `redis-service: setting cache for key: ${key} with ttl: ${ttl}`,
    );
    await this.client.set(String(key), JSON.stringify(value), {
      EX: ttl, // Set expiration time in seconds if provided
    });
  }
}
