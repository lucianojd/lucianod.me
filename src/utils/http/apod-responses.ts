import { NextResponse } from 'next/server';
import {
  HTTPBadRequest,
  HTTPNotFound,
  HTTPSuccess,
} from '@src/utils/http/error-responses';
import { NasaMedia } from '@src/types/apod';

export function HTTPCountExceedsLimit(count: number): NextResponse {
  return HTTPBadRequest({
    message: `Count exceeds the limit of ${count}`,
    count: count,
  });
}

export function HTTPNoDataFoundAtSpecifiedOffset(
  offset: number | null,
  count: number | null,
): NextResponse {
  if (offset === null || count === null) {
    return HTTPNotFound({ message: 'No data found.' });
  }
  return HTTPNotFound({
    message: `No data found at the specified offset: ${offset}`,
    offset: offset,
    count: count,
  });
}

export function HTTPNoDataFoundForDate(date: string): NextResponse {
  return HTTPNotFound({
    message: `No data found for the specified date: ${date}`,
    date: date,
  });
}

export function HTTPApodData(nasaMedia: NasaMedia[]): NextResponse {
  return HTTPSuccess(nasaMedia);
}
