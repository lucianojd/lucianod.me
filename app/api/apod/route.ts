import { APODServerFactory, APODServerError } from '@src/apod';
import { writeApod } from '@src/firebase';
import { NasaMedia } from '@src/types/apod';
import {
  HTTPApodData,
  HTTPCountExceedsLimit,
  HTTPNoDataFoundAtSpecifiedOffset,
} from '@src/utils/http/apod-responses';
import { HTTPInternalServerError } from '@src/utils/http/error-responses';
import { parseSearchParamInt } from '@src/utils/page-helpers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const offset = parseSearchParamInt(searchParams.get('offset'));
  const count = parseSearchParamInt(searchParams.get('count'));

  // Limit response to 100 results.
  if (typeof count === 'number' && count > 100)
    return HTTPCountExceedsLimit(count);

  try {
    const apodServer = await APODServerFactory.create();

    let data: NasaMedia[] | undefined = [];

    if (typeof offset === 'number' && typeof count === 'number') {
      data = await apodServer.getAPODRange(offset, count);
    } else {
      data = await apodServer.getAPOD();
    }

    if (!data || data.length === 0)
      return HTTPNoDataFoundAtSpecifiedOffset(offset, count);

    await Promise.all(
      data.map((entry) => {
        return new Promise<void>((resolve) => {
          writeApod(entry)
            .then(() => resolve())
            .catch(() => resolve());
        });
      }),
    );

    return HTTPApodData(data);
  } catch (error: unknown) {
    if (error instanceof APODServerError) {
      return error;
    }
    return HTTPInternalServerError({
      message: 'An error occurred while fetching APOD data.',
    });
  }
}
