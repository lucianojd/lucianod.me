import { JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@app/_components/Icon';

function Footer(): JSX.Element {
  return (
    <footer>
      <Link href="/">
        <Image
          loading="eager"
          fill
          alt="lucianod.me"
          src={'/cubed_earth.png'}
        />
      </Link>
      <Icon name="github" />
      <Icon name="linkedin" />
    </footer>
  );
}

export default Footer;
