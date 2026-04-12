'use client';

import { NasaImage } from '@app/apod/[date]/page';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

type ApodImageProps = {
  media: NasaImage;
};

const LocalDate = dynamic(() => import('@src/components/local-date'), {
  ssr: false,
});

function ApodImage({ media }: ApodImageProps) {
  return (
    <section className="apod">
      <div className="image">
        <Image
          fill
          sizes="30vw"
          loading="eager"
          alt="Astronomy image of the day."
          src={media.url}
        />
      </div>
      <div className="blurb">
        <h1>{media.title}</h1>
        <h2>{media.copyright}</h2>
        <p>{media.explanation}</p>
        <LocalDate
          date={media.date}
          component={(localDate) => <h3>{localDate}</h3>}
        />
        <Link className="blurb-url" href={media.url}>
          Standard Definition
        </Link>
        <br />
        <Link className="blurb-url" href={media.hdurl}>
          High Definition
        </Link>
      </div>
    </section>
  );
}

export default ApodImage;
