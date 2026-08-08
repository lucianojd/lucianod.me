'use client';

import { CLOUD_FLARE_TURNSTILE } from '@src/constants';
import { useEffect, useRef } from 'react';

export default function CloudFlareTurnstile() {
  const ref = useRef<string>(null);
  const id = 'cloudflare-turnstile';

  // TODO repair explicit any typing.
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref.current = (window as any)?.turnstile?.render(`#${id}`, {
      sitekey: CLOUD_FLARE_TURNSTILE.SITE_KEY,
    });

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any)?.turnstile.remove(ref.current || '');
      ref.current = null;
    };
  }, []);

  return <div id={id} />;
}
