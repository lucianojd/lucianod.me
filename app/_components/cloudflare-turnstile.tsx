'use client';

import { CLOUD_FLARE_TURNSTILE } from '@app/_constants';
import { useEffect, useRef } from 'react';

export default function CloudFlareTurnstile() {
  const ref = useRef<string>(null);
  const id = 'cloudflare-turnstile';

  // TODO repair explicit any typing.
  useEffect(() => {
    ref.current = (window as any)?.turnstile?.render(`#${id}`, {
      sitekey: CLOUD_FLARE_TURNSTILE.SITE_KEY,
    });

    return () => {
      (window as any)?.turnstile.remove(ref.current || '');
      ref.current = null;
    };
  }, []);

  return <div id={id} />;
}
