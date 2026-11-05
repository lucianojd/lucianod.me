import { validateStandardDate } from '@src/utils';
import { NextRequest } from 'next/server';
import { APODServerFactory, APODServerError } from '@src/apod';
import {
  HTTPBadRequest,
  HTTPInternalServerError,
  HTTPNotFound,
} from '@src/utils/http/error-responses';
import { HTTPApodData } from '@src/utils/http/apod-responses';

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ date: string }> },
) {
  const date = await params.then((p) => p.date);

  if (typeof date !== 'string' || !validateStandardDate(date)) {
    return HTTPBadRequest({
      message: 'Invalid date format. Expected YYYY-MM-DD',
      date: date,
    });
  }

  try {
    const apodServer = await APODServerFactory.create();
    const data = await apodServer.getAPODByDate(date);
    if (data) {
      return HTTPApodData([data]);
    } else {
      return HTTPNotFound({
        message: 'APOD not found for the specified date',
        date: date,
      });
    }
  } catch (error) {
    if (error instanceof APODServerError) {
      return error;
    }
    return HTTPInternalServerError({
      message: 'An error occurred while fetching APOD data.',
    });
  }
}
