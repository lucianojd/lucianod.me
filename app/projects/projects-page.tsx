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
