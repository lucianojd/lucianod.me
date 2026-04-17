'use server';

import ApodPage from '../../../src/components/apod/apod-page';

export default async function Page({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  return <ApodPage date={date} />;
}
