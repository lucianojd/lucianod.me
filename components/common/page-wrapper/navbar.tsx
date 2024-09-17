import Link from 'next/link';
import styles from '@styles/components/navbar.module.scss';
import { SITE_NAME } from '@components/constants';

interface NavbarProps {
  items: Array<{
    name: string;
    path: string;
  }>;
}

function Navbar({ items }: NavbarProps) {
  return (
    <div id="navbar" className={styles.container}>
      <span id="logo">
        <Link href={'/'}>{SITE_NAME}</Link>
      </span>
    </div>
  );
}

export default Navbar;
