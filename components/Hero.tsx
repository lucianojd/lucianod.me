import { memo } from 'react';
import styles from './styles/Hero.module.scss';

interface HeroProps {
    title: string;
}

function Hero({ title }: HeroProps) {
    return <div className={styles.container}><h1>{ title }</h1></div>;
}

export default memo(Hero);