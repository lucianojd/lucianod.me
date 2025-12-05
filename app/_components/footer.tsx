import { JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Footer(): JSX.Element {
  return (
    <footer>
      <Link href="/">
        <Image fill alt="lucianod.me" src={'/cubed_earth.png'} />
      </Link>
      <Link href="https://github.com/lucianojd">
        <Image fill alt="GitHub" src={'/github.svg'} />
      </Link>
      <Link href="https://www.linkedin.com/in/lucianojd">
        <Image fill alt="LinkedIn" src={'/linkedin.png'} />
      </Link>
    </footer>
  );
}

export default Footer;
