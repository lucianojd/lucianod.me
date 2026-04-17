import type { AboutMe } from '@src/types/resume';

export default function AboutMe({ description }: AboutMe) {
  return (
    <section id="about-me">
      <h1>About me</h1>
      <p>{description}</p>
    </section>
  );
}
