import { NextRequest, NextResponse } from 'next/server';
import { APODServerFactory } from '@src/apod';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get('offset') || '0', 10);
  const count = parseInt(searchParams.get('count') || '1', 10);

  // Limit response to 10 results.
  if (count > 1000) {
    return NextResponse.json(
      { message: 'Count cannot exceed 10' },
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }

  try {
    const apodServer = await APODServerFactory.create();
    const data = await apodServer.getAPODRange(offset, count);

    return NextResponse.json(data, {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (_) {
    return NextResponse.json(
      { message: 'Internal server error' },
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
}
