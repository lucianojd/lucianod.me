import { validateStandardDate } from '@src/utils';
import { NextRequest, NextResponse } from 'next/server';
import APODServer from '@src/apod';
import { RedisService } from '@src/redis';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ date: string }> },
) {
  const date = await params.then((p) => p.date);

  if (typeof date !== 'string' || !validateStandardDate(date)) {
    return NextResponse.json(
      { message: 'Invalid date format. Expected YYYY-MM-DD' },
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }

  try {
    const apodServer = await APODServer.getInstance(new RedisService());
    const data = await apodServer.getAPOD(date);

    return NextResponse.json(data, {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      { message: 'Internal server error' },
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }

  return NextResponse.json({ date });
}
