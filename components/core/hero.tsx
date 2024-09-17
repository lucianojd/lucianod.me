import styles from '@styles/components/hero.module.scss';
import { memo } from 'react';
import Image from 'next/image';

// Found on blog:
// https://www.perssondennis.com/articles/how-to-make-a-hero-image-in-nextjs#user-content-nextjs-image-component


function Hero() {
    return(
        <div className={styles.heroWrapper}>
            <div className={styles.imageWrapper}>
                <div className={styles.imageGradient} />
                    <Image 
                        priority 
                        src='/jungle.jpg'
                        blurDataURL='/jungle_blur.jpg'
                        layout='fill' 
                        objectFit='cover' 
                        objectPosition="center" 
                        alt='Hero image.'
                        className={styles.heroImage} 
                    />
            </div>
            <div className={styles.heroContent}>
                <h1>Luciano De Gianni</h1>
                <p>Software Engineer and Full Stack Developer</p>
            </div>
        </div>
    );
}

export default memo(Hero);