import type { Project } from '@src/types/project';
import Link from 'next/link';
import Icon from '../icon';

interface ProjectProps {
    project: Project;
}

export function Project({ project }: ProjectProps) {
    return (
        <li>
            <Link className='project-card' href={project.repo} target="_blank" rel="noopener noreferrer">
                {project.name}
            </Link>
            <p>{project.subtitle}</p>
            <section className='icon-list'>
                {project.icons.map((icon) => <Icon key={icon} name={icon} />)}
            </section>
        </li>
    )
}

interface ProjectListProps {
    projectList: Project[];
}

export default function ProjectList({ projectList }: ProjectListProps) {
    return (
        <ul className='project'>
            {projectList.map((project) => <Project key={project.name} project={project} />)}
        </ul>
    )
}