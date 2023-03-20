import Link from 'next/link';
import styles from '@styles/Navbar.module.scss';

interface NavbarProps {
  items: Array<{
    name: string;
    path: string;
  }>;
}

function Navbar({ items }: NavbarProps) {
  return (
    <div className={styles.container}>
      {items.map(({ name, path }, index) => (
        <div key={index} className={styles.navItem}>
          <Link href={path}>{name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Navbar;
