'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { NasaMedia, NasaImage } from './page';
import Error from 'next/error';

type MediaList = NasaMedia[];

type ApodPageProps = {
  fetchedNasaMedia: MediaList;
};

function ApodMediaComponent({ media }: { media: NasaMedia }) {
  if (media.media_type === 'image') {
    const castedMedia: NasaImage = media as NasaImage;

    return (
      <section className="todays-photo">
        <div className="image">
          <Image
            fill
            loading="eager"
            alt="Astronomy image of the day."
            src={castedMedia.url}
          />
        </div>
        <div className="blurb">
          <h1>{castedMedia.title}</h1>
          <h2>{castedMedia.copyright}</h2>
          <p>{castedMedia.explanation}</p>
          <h3>{castedMedia.date}</h3>
          <Link href={castedMedia.url}>Standard Definition</Link>
          <br></br>
          <Link href={castedMedia.hdurl}>High Definition</Link>
        </div>
      </section>
    );
  } else if (media.media_type === 'video') {
    return <div />;
  } else {
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
