import { NasaImage } from './page';
import Image from 'next/image';
import Link from 'next/link';

type ApodImageProps = {
  media: NasaImage;
};

function ApodImage({ media }: ApodImageProps) {
  return (
    <section className="apod">
      <div className="image">
        <Image
          fill
          loading="eager"
          alt="Astronomy image of the day."
          src={media.url}
        />
      </div>
      <div className="blurb">
        <h1>{media.title}</h1>
        <h2>{media.copyright}</h2>
        <p>{media.explanation}</p>
        <h3>{media.date}</h3>
        <Link href={media.url}>Standard Definition</Link>
        <br />
        <Link href={media.hdurl}>High Definition</Link>
      </div>
    </section>
  );
}

export default ApodImage;
