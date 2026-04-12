import { JSX } from 'react';
import Icon from '@src/components/icon';
import Link from 'next/link';

function Footer(): JSX.Element {
  return (
    <footer>
      <Link href="/contact" target="_blank" rel="noopener noreferrer">
        Contact me
      </Link>
      <Link
        href="https://www.linkedin.com/in/lucianojd"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </Link>
      <Link href="https://github.com/lucianojd">GitHub</Link>
    </footer>
  );
}

export default Footer;
