export const SITE_NAME = 'lucianod.me';

export const ENVIRONMENT = process.env.ENVIRONMENT ?? 'production';

export const EMAIL_USER = process.env.EMAIL_USER ?? '';
export const EMAIL_PASS = process.env.EMAIL_PASS ?? '';

export const CLOUD_FLARE_TURNSTILE = {
    WIDGET_URL: 'https://challenges.cloudflare.com/turnstile/v0/api.js',
    VERIFY_URL: 'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '',
    SECRET_KEY: process.env.TURNSTILE_SECRET_KEY ?? '',
}

export const NASA = {
  API_URL: 'https://api.nasa.gov/planetary/apod',
  API_KEY: process.env.NASA_API_KEY,
};
