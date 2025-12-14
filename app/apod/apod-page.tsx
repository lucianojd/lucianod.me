'use client';

import { useEffect, useState } from 'react';
import type { NasaMedia, NasaImage, NasaVideo } from './page';
import Error from 'next/error';
import dynamic from 'next/dynamic';

const ApodImage = dynamic(() => import('./apod-image'));
const ApodVideo = dynamic(() => import('./apod-video'));

type MediaList = NasaMedia[];

type ApodPageProps = {
  fetchedNasaMedia: MediaList;
};

function ApodMediaComponent({ media }: { media: NasaMedia }) {
  switch (media.media_type) {
    case 'image':
      return <ApodImage media={media as NasaImage} />;
    case 'video':
      return <ApodVideo media={media as NasaVideo} />;
    default:
      return <Error statusCode={500} />;
  }
}

export default function ApodPage({ fetchedNasaMedia }: ApodPageProps) {
  const [today, setToday] = useState<NasaMedia | undefined>(undefined);

  useEffect(() => {
    fetchedNasaMedia.forEach((media) => {
      media.date = new Date(media.date).toLocaleDateString();
    });

    setToday(fetchedNasaMedia[0]);
  }, []);

  return (
    <main>
      <h1>Astronomy Picture of the Day</h1>
      {today && <ApodMediaComponent media={today} />}
    </main>
  );
}
