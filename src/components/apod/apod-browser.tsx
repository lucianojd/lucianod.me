'use client';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { NasaMedia } from '@src/types/apod';
import { useState } from 'react';
import Link from 'next/link';

interface ApodMediaListProps {
  data: NasaMedia[];
  status: 'pending' | 'error' | 'success';
}

function ApodMediaList({ data, status }: ApodMediaListProps) {
  switch (status) {
    case 'pending':
      return <div>Loading...</div>;
    case 'error':
      return <div>Error loading data.</div>;
    case 'success':
      return (
        <ul className="apod-browser-list">
          {data.map((entry: NasaMedia) => (
            <li key={entry.date}>
              <Link href={`/apod/${entry.date}`}>{entry.title}</Link>
            </li>
          ))}
        </ul>
      );
    default:
      return <div />;
  }
}

export default function ApodBrowser() {
  const [index, setIndex] = useState(0);

  const options = [5, 10, 20, 50];
  const [count, setCount] = useState(options[0]);

  const { data, status } = useQuery<NasaMedia[]>({
    queryKey: ['apod', index, count],
    queryFn: async () => {
      const data = await axios
        .get(`/api/apod`, {
          params: {
            offset: index,
            count: count,
          },
        })
        .then((res) => res.data);
      return data;
    },
  });

  return (
    <section className="apod-browser">
      <section className="apod-browser-header">
        <h1>Astronomy Picture of the Day Browser</h1>
        <select
          defaultValue={count}
          onChange={(e) => setCount(Number(e.target.value))}
          id="apod-browser-count-select"
          name="apod-browser-count-select"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </section>
      <section className="apod-browser-list">
        <ApodMediaList data={data || []} status={status} />
      </section>
      <section className="apod-browser-pagination">
        <button disabled={index <= 0} onClick={() => setIndex(index - 1)}>
          Back
        </button>
        <label>{index + 1}</label>
        <button onClick={() => setIndex(index + 1)}>Next</button>
      </section>
    </section>
  );
}
