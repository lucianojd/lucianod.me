// Import your Client Component
import HomePage from './home-page';
import fs from 'fs';
import path from 'path';

export default async function Page() {
  // Fetch data directly in a Server Component
  // Forward fetched data to your Client Component

  const assetsDir = path.join(process.cwd(), 'app/_assets');
  const professionalExperienceFile = path.join(assetsDir, 'home.json');

  const data = fs.readFileSync(professionalExperienceFile, 'utf-8');
  const parsedData = JSON.parse(data);

  return <HomePage {...parsedData} />;
}
