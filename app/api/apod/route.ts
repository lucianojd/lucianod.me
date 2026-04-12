import { NextRequest } from 'next/server';
import { RedisService } from '@src/redis';
import { createKey } from '@src/apod';
import { NASA } from '@src/constants';
import type { NasaMedia } from '@src/types/apod';
import { getDateRange } from '@src/utils';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get('offset') || '0', 10);
  const count = parseInt(searchParams.get('count') || '1', 10);

  // Limit response to 10 results.
  if (count > 10) {
    return new Response(JSON.stringify({ message: 'Count cannot exceed 10' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  const dates = getDateRange(offset, count);

  try {
    const redis = await RedisService.getInstance();
    const today = new Date();
    const results: NasaMedia[] = [];

    for (let i = 0; i < count; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - offset - i);
      const key = createKey(date);
      const dateStr = date.toISOString().split('T')[0];

      const cached = await redis.get<NasaMedia>(key);
      if (cached) {
        results.push(cached);
        // Reset TTL to 24 hours
        await redis.set(key, cached, 24 * 60 * 60);
      } else {
        // Fetch from NASA API
        const url = `${NASA.API_URL}?api_key=${NASA.API_KEY}&date=${dateStr}`;
        const response = await fetch(url);
        if (!response.ok) {
          console.error(
            `Failed to fetch APOD for ${dateStr}: ${response.status}`,
          );
          continue;
        }
        const data: NasaMedia = await response.json();
        results.push(data);
        await redis.set(key, data, 24 * 60 * 60);
      }
    }

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (e) {
    console.error('Error in APOD API route: ', e);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
