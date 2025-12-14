import Link from 'next/link';
import type { Project } from './page';
import Icon from '@app/_components/Icon';

type ProjectPageProps = {
  projects: Project[];
};

export default function ProjectsPage({ projects }: ProjectPageProps) {
  return (
    <main>
      <h1>Projects</h1>
      <h2>On this Site</h2>
      <h3>APOD (Astronomy Picture of the Day)</h3>
      <p>
        Checkout the latest{' '}
        <Link href={'/apod'}>astronomy picture of the day</Link> from NASA
        themselves!
      </p>
      <h2>External to this Website</h2>
      <ul className="project">
        {projects.map((project) => (
          <li key={project.name}>
            <Link
              className="project-card"
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.name}
            </Link>
            <p>{project.subtitle}</p>
            <section className="icon-list">
              {project.icons.map((icon) => (
                <Icon key={icon} name={icon} />
              ))}
            </section>
          </li>
        ))}
      </ul>
    </main>
  );
}
