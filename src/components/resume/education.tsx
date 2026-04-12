'use client';

import type { Education } from '@src/types/resume';
import dynamic from 'next/dynamic';

interface EducationProps {
  education: Education[];
}

const LocalDate = dynamic(() => import('@src/components/local-date'), {
  ssr: false,
});

function Institution({ institution, degree, endDate, startDate }: Education) {
  return (
    <div>
      <h2>{institution}</h2>
      <h3>
        {degree};{' '}
        <LocalDate
          date={startDate}
          component={(localDate) => <>{localDate}</>}
        />{' '}
        -{' '}
        <LocalDate date={endDate} component={(localDate) => <>{localDate}</>} />
      </h3>
    </div>
  );
}

export default function Education({ education }: EducationProps) {
  return (
    <section id="education">
      <h1>Education</h1>
      {education.map(({ institution, degree, endDate, startDate }, index) => (
        <Institution
          key={index}
          institution={institution}
          degree={degree}
          endDate={endDate}
          startDate={startDate}
        />
      ))}
    </section>
  );
}
