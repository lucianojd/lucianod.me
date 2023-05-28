import styles from '@styles/components/box.module.scss';

type BoxProps = JSX.IntrinsicElements['div'];

function Box(props: BoxProps) {
  return <div className={styles.container} {...props} />;
}

export default Box;
