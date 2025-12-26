export const SITE_NAME = 'lucianod.me';

export const ENVIRONMENT = process.env.ENVIRONMENT ?? 'development';

export const EMAIL: {
  RECIPIENT: string;
  USER: string;
  PASS: string;
  HOST: string;
} =
  process.env.ENVIRONMENT == 'production'
    ? {
        RECIPIENT: process.env.PROD_INBOX_EMAIL ?? '',
        USER: process.env.PROD_EMAIL_USER ?? '',
        PASS: process.env.PROD_EMAIL_PASS ?? '',
        HOST: process.env.PROD_EMAIL_HOST ?? '',
      }
    : {
        RECIPIENT: process.env.DEV_INBOX_EMAIL ?? '',
        USER: process.env.DEV_EMAIL_USER ?? '',
        PASS: process.env.DEV_EMAIL_PASS ?? '',
        HOST: process.env.DEV_EMAIL_HOST ?? '',
      };

export const CLOUD_FLARE_TURNSTILE = {
  WIDGET_URL:
    'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
  VERIFY_URL: 'https://challenges.cloudflare.com/turnstile/v0/siteverify',
  SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '',
  SECRET_KEY: process.env.TURNSTILE_SECRET_KEY ?? '',
};

export const NASA = {
  API_URL: 'https://api.nasa.gov/planetary/apod',
  API_KEY: process.env.NASA_API_KEY,
};
