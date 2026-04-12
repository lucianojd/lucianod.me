'use server';

import ApodPage from '../../../src/components/apod/apod-page';
import { connection } from 'next/server';
import { APODServer } from '@src/apod';
import { AxiosError } from 'axios';

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

async function loadNasaMedia(date: string): Promise<NasaMedia> {
  await connection(); // Ensure the connection is established before proceeding
  return await APODServer.getAPOD(date);
}

export default async function Page({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  try {
    const nasaMedia: NasaMedia = await loadNasaMedia(date);
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
