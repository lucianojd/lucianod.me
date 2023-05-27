import styles from '@styles/components/box.module.scss';
import { ReactNode } from 'react';

interface BoxProps {
  children: ReactNode | Array<ReactNode>;
}

function Box({ children }: BoxProps) {
  return <div className={styles.container}>{children}</div>;
}

export default Box;
