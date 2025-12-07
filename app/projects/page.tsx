import ProjectsPage from './projects-page';
import path from 'path';
import fs from 'fs';
import { isIconName, Name } from '@app/_components/Icon';

export type Project = {
  name: string;
  subtitle: string;
  description: string;
  repo: string;
  tags: string[];
  icons: Name[];
};

export default async function Page() {
  const assetsDir = path.join(process.cwd(), 'app/projects/_assets');
  const dataFile = path.join(assetsDir, 'projects.json');

  const data = fs.readFileSync(dataFile, 'utf-8');
  const parsedData: Project[] = JSON.parse(data);

  parsedData.forEach((project) => {
    project.icons = project.icons.filter((icon) => isIconName(icon)).sort();
  });

  return <ProjectsPage projects={parsedData} />;
}
