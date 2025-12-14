'use server';

import ApodPage from './apod-page';
import axios from 'axios';
import { NASA } from '@app/_constants';
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
  await connection();
  const result = await axios.get(NASA.API_URL, {
    params: {
      api_key: NASA.API_KEY,
    },
  });

  return result.data as NasaMedia;
}

export default async function Page() {
  try {
    const nasaMedia: NasaMedia = await loadNasaMedia();
    return <ApodPage fetchedNasaMedia={[nasaMedia]} />;
  } catch (_) {
    return <div>{}</div>;
  }
}
