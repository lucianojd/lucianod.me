'use client';

import { NasaMedia, NasaImage, NasaVideo } from '@src/types/apod';
import ApodImage from '@src/components/apod/apod-image';
import ApodVideo from '@src/components/apod/apod-video';
import Error from 'next/error';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type ApodPageProps = {
  date: string;
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

export default function ApodPage({ date }: ApodPageProps) {
  const { data, isLoading, isError } = useQuery<NasaMedia>({
    queryKey: ['apod', date],
    queryFn: async () => {
      const data = await axios
        .get<NasaMedia>(`/api/apod/${date}`)
        .then((res) => res.data);
      return data;
    },
  });

  return (
    <section>
      <h1>Astronomy Picture of the Day</h1>
      {isLoading && <p>Loading...</p>}
      {data && <ApodMediaComponent media={data} />}
      {isError && <p>Error loading data.</p>}
    </section>
  );
}
