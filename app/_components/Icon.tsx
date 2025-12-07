import { JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export type Name =
  | 'docker'
  | 'github'
  | 'javascript'
  | 'linkedin'
  | 'nginx'
  | 'python'
  | 'reactjs'
  | 'sass'
  | 'typescript'
  | 'nodejs'
  | 'linux'
  | 'nextjs'
  | 'cloudflare'
  | 'digitalocean'
  | 'yarn'
  | 'vscode';

type IconProps = {
  name: Name;
};

function getSrc(name: Name): string {
  return `/icons/${name}.svg`;
}

function getAlt(name: Name): string {
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
    default:
      return '';
  }
}

function getLink(name: Name): string {
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
    default:
      return '';
  }
}

export function isIconName(name: string): name is Name {
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
  ].includes(name);
}

function Icon({ name }: IconProps): JSX.Element {
  if (!isIconName(name)) throw new Error(`Invalid icon name: ${name}`);

  return (
    <Link href={getLink(name)}>
      <Image fill alt={getAlt(name)} src={getSrc(name)} />
    </Link>
  );
}

export default Icon;
