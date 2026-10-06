import { JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ICON_LIST } from '@src/constants';
import type { ImageProps } from 'next/image';
import type{ IconName } from '@src/types/icon';


type IconProps = {
  name: IconName;
  label?: boolean;
  containerClassName?: string;
  imageContainerClassName?: string;
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
    case 'java':
      return 'Java';
    case 'bootstrap':
      return 'Bootstrap';
    case 'c':
      return 'C';
    case 'confluence':
      return 'Confluence';
    case 'css3':
      return 'CSS3';
    case 'fedora':
      return 'Fedora';
    case 'gcc':
      return 'GCC';
    case 'git':
      return 'Git';
    case 'jira':
      return 'Jira';
    case 'oracle':
      return 'Oracle';
    case 'red_hat':
      return 'Red Hat';
    case 'sql_developer':
      return 'SQL Developer';
    case 'xamarin':
      return 'Xamarin';
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
    case 'java':
      return 'https://dev.java';
    case 'bootstrap':
      return 'https://getbootstrap.com';
    case 'c':
      return 'https://en.wikipedia.org/wiki/C_(programming_language)';
    case 'confluence':
      return 'https://www.atlassian.com/software/confluence';
    case 'css3':
      return 'https://developer.mozilla.org/en-US/docs/Web/CSS';
    case 'fedora':
      return 'https://getfedora.org';
    case 'gcc':
      return 'https://gcc.gnu.org';
    case 'git':
      return 'https://git-scm.com';
    case 'jira':
      return 'https://www.atlassian.com/software/jira';
    case 'oracle':
      return 'https://www.oracle.com';
    case 'red_hat':
      return 'https://www.redhat.com';
    case 'sql_developer':
      return 'https://www.oracle.com/database/technologies/appdev/sql-developer.html';
    case 'xamarin':
      return 'https://dotnet.microsoft.com/apps/xamarin';
    default:
      return '';
  }
}

export function isIconName(name: string): name is IconName {
  return ICON_LIST.includes(name);
}

function Icon({
  name,
  containerClassName,
  imageContainerClassName,
  loading = 'lazy',
  label = false
}: IconProps): JSX.Element {
  if (!isIconName(name)) throw new Error(`Invalid icon name: ${name}`);

  return (
    <Link href={getLink(name)} target="_blank" rel="noopener noreferrer">
      <div className={containerClassName}>
        <div className={imageContainerClassName}>
          <Image
            fill
            loading={loading}
            alt={getAlt(name)}
            src={getSrc(name)}
          />
        </div>
      {label && <span className="icon-label">{getAlt(name)}</span>}
      </div>
    </Link>
  );
}

export default Icon;
