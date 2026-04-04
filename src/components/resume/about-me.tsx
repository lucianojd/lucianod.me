import type { AboutMe } from '@src/types/resume';

export interface AboutMeProps extends AboutMe {}

export default function AboutMe({ description }: AboutMeProps) {
    return (
        <section id="about-me">
        <h1>About me</h1>
        <p>{description}</p>
        </section>
    );
}