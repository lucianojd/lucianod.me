import path from 'path';
import fs from 'fs';
import ProjectList from "@src/components/project/project-list";
import type { Project } from '@src/types/project';

async function fetchProjects(): Promise<Project[]> {
  const assetsDirectory = path.join(process.cwd(), 'src/assets');
  const projectsFile = path.join(assetsDirectory, 'projects.json');
  const projectsData = fs.readFileSync(projectsFile, 'utf8');
  return JSON.parse(projectsData) as Project[];
}

export default async function Page() {
  const projects = await fetchProjects();

  return (
    <section id="home-page">
      <h1>Welcome to the Home Page</h1>
      <p>To learn more about me, check out my <a href="/resume">resume</a>.</p>
      <h1>Projects</h1>
      <h2>Here are some interesting projects I have built on this site:</h2>
      <p>Here is a page for browsing NASA's astronomy picture of the day: <a href='/apod'>apod</a></p>
      <h2>Here are some of my projects:</h2>
      <ProjectList projectList={projects} />
    </section>
  );
}
