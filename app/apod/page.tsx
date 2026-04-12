import { redirect } from 'next/navigation';
import { getStandardFromDate } from '@src/utils';

export default async function Page() {
  // Redirect to today's APOD page.
  const date = new Date();
  redirect(`/apod/${getStandardFromDate(date)}`);
  // Satisfy TypeScript return type requirements.
  return <div />;
}
