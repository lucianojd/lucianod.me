import { JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { IconName } from '@src/types/icon';
import type { ImageProps } from 'next/image';

type IconProps = {
  name: IconName;
  containerClassName?: string;
  imageClassName?: string;
  loading?: ImageProps['loading'];
};

function getSrc(name: IconName): string {
  return `/icons/${name}.svg`;
}

function getAlt(name: IconName): string {
  switch (name) {
    case 'docker':
      return 'Docker';
    case 'github':
      return 'GitHub';
    case 'javascript':
      return 'JavaScript';
    case 'linkedin':
      return 'LinkedIn';
    case 'nginx':
      return 'Nginx';
    case 'python':
      return 'Python';
    case 'reactjs':
      return 'ReactJS';
    case 'sass':
      return 'Sass';
    case 'typescript':
      return 'TypeScript';
    case 'linux':
      return 'Linux';
    case 'nodejs':
      return 'NodeJS';
    case 'nextjs':
      return 'NextJS';
    case 'cloudflare':
      return 'Cloudflare';
    case 'digitalocean':
      return 'DigitalOcean';
    case 'yarn':
      return 'Yarn';
    case 'vscode':
      return 'VSCode';
    case 'graphql':
      return 'GraphQL';
    case 'mysql':
      return 'MySQL';
    case 'pm2':
      return 'PM2';
    case 'redis':
      return 'Redis';
    case 'expo':
      return 'Expo';
    case 'apple':
      return 'Apple';
    case 'android':
      return 'Android';
    case 'earth':
      return 'Earth';
    default:
      return '';
  }
}

function getLink(name: IconName): string {
  switch (name) {
    case 'docker':
      return 'https://www.docker.com/';
    case 'linkedin':
      return 'https://www.linkedin.com/in/lucianojd';
    case 'github':
      return 'https://github.com/lucianojd';
    case 'javascript':
      return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript';
    case 'nginx':
      return 'https://nginx.org/index.html';
    case 'python':
      return 'https://www.python.org';
    case 'reactjs':
      return 'https://react.dev';
    case 'sass':
      return 'https://sass-lang.com';
    case 'typescript':
      return 'https://www.typescriptlang.org';
    case 'nodejs':
      return 'https://nodejs.org/en';
    case 'linux':
      return 'https://www.linux.org';
    case 'nextjs':
      return 'https://nextjs.org';
    case 'cloudflare':
      return 'https://www.cloudflare.com';
    case 'digitalocean':
      return 'https://www.digitalocean.com';
    case 'yarn':
      return 'https://yarnpkg.com';
    case 'vscode':
      return 'https://code.visualstudio.com';
    case 'graphql':
      return 'https://graphql.org';
    case 'mysql':
      return 'https://www.mysql.com';
    case 'pm2':
      return 'https://pm2.keymetrics.io';
    case 'redis':
      return 'https://redis.io';
    case 'expo':
      return 'https://expo.dev';
    case 'apple':
      return 'https://developer.apple.com';
    case 'android':
      return 'https://developer.android.com';
    case 'earth':
      return '/';
    default:
      return '';
  }
}

export function isIconName(name: string): name is IconName {
  return [
    'docker',
    'github',
    'javascript',
    'linkedin',
    'nginx',
    'python',
    'reactjs',
    'sass',
    'typescript',
    'nodejs',
    'linux',
    'nextjs',
    'cloudflare',
    'digitalocean',
    'yarn',
    'vscode',
    'graphql',
    'mysql',
    'pm2',
    'redis',
    'expo',
    'apple',
    'android',
    'earth',
  ].includes(name);
}

function Icon({
  name,
  containerClassName,
  imageClassName,
  loading = 'lazy',
}: IconProps): JSX.Element {
  if (!isIconName(name)) throw new Error(`Invalid icon name: ${name}`);

  return (
    <Link className={containerClassName} href={getLink(name)}>
      <Image
        className={imageClassName}
        fill
        loading={loading}
        alt={getAlt(name)}
        src={getSrc(name)}
      />
    </Link>
  );
}

export default Icon;
