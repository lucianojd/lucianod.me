'use client';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { NasaMedia } from '@src/types/apod';
import { useState } from 'react';
import Link from 'next/link';

export default function ApodBrowser() {
  const [index] = useState(0);
  const { data } = useQuery<NasaMedia[]>({
    queryKey: ['apod', index],
    queryFn: async () => {
      const data = await axios
        .get(`/api/apod`, {
          params: {
            offset: index,
            count: 10,
          },
        })
        .then((res) => res.data);
      return data;
    },
  });

  return (
    <section id="apod-browser">
      <h1>Astronomy Picture of the Day Browser</h1>
      <ul>
        {data &&
          data.map((entry: NasaMedia) => (
            <li key={entry.date}>
              <Link href={`/apod/${entry.date}`}>{entry.title}</Link>
            </li>
          ))}
      </ul>
    </section>
  );
}
