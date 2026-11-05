'use client';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { NasaMedia } from '@src/types/apod';
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
              <Link href={entry.url} target="_blank">
                {entry.title}
              </Link>
              <span>{entry.date}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return <div />;
  }
}

//! Commented out pagination logic until NASA has re-implemented the ability to fetch multiple APOD entries at once. Until then, this component will only display the most recent APOD entry.
export default function ApodBrowser() {
  // const [index, setIndex] = useState(0);

  // const options = [5, 10, 20, 50];
  // const [count, setCount] = useState(options[0]);

  const { data, status } = useQuery<NasaMedia[]>({
    queryKey: ['apod'],
    queryFn: async () => {
      const data = await axios.get(`/api/apod`).then((res) => res.data);
      return data;
    },
  });

  return (
    <section className="apod-browser">
      <section className="apod-browser-header">
        <h1>Astronomy Picture of the Day Browser</h1>
        {/* <select
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
        </select> */}
      </section>
      <section className="apod-browser-list">
        <ApodMediaList data={data || []} status={status} />
      </section>
      {/* <section className="apod-browser-pagination">
        <button disabled={index <= 0} onClick={() => setIndex(index - 1)}>
          Back
        </button>
        <label>{index + 1}</label>
        <button onClick={() => setIndex(index + 1)}>Next</button>
      </section> */}
    </section>
  );
}
