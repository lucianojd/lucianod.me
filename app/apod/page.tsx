'use server';

import ApodPage from './apod-page';
import axios, { AxiosError } from 'axios';
import { NASA } from '@src/constants';
import { RedisService } from '@src/components/server/redis';
import { connection } from 'next/server';

export interface NasaMedia {
  date: string;
  explanation: string;
  service_version: string;
  title: string;
  media_type: 'image' | 'video' | 'other';
}

export interface NasaImage extends NasaMedia {
  media_type: 'image';
  copyright: string;
  hdurl: string;
  url: string;
}

export interface NasaVideo extends NasaMedia {
  media_type: 'video';
  url: string;
}

export interface NasaOther extends NasaMedia {
  media_type: 'other';
}

export type ApodAPIResponse = {
  data: NasaMedia;
  info: {
    rateLimitRemaining: number;
  };
};

async function loadNasaMedia(): Promise<NasaMedia> {
  await connection(); // Ensure the connection is established before proceeding
  const redisInstance = await RedisService.getInstance();

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayKey = `apod:${year}-${month}-${day}`;

  const cachedData = await redisInstance.get<NasaMedia>(todayKey);

  if (cachedData) {
    return cachedData;
  } else {
    const result = await axios.get(NASA.API_URL, {
      params: {
        api_key: NASA.API_KEY,
      },
    });

    const nasaMedia = result.data as NasaMedia;
    await redisInstance.set(todayKey, nasaMedia, 60 * 60 * 24);

    return nasaMedia;
  }
}

export default async function Page() {
  try {
    const nasaMedia: NasaMedia = await loadNasaMedia();
    return <ApodPage fetchedNasaMedia={[nasaMedia]} />;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return (
        <main>
          <h1>{`Unable to load astronomy picture of the day`}</h1>
          <h2>{`Looks like there was an error on our end :(`}</h2>
        </main>
      );
    }
    return <main>Something really went wrong</main>;
  }
}
