import { NasaVideo } from './page';
import Link from 'next/link';

type ApodVideoProps = {
  media: NasaVideo;
};

function ApodVideo({ media }: ApodVideoProps) {
  return (
    <section className="apod">
      <div className="video">
        <iframe src={media.url} />
      </div>
      <div className="blurb">
        <h1>{media.title}</h1>
        <p>{media.explanation}</p>
        <h3>{media.date}</h3>
        <Link className='blurb-url' href={media.url}>Video</Link>
      </div>
    </section>
  );
}

export default ApodVideo;
