'use server';

import path from 'path';
import fs from 'fs';
import AboutMe from '@src/components/resume/about-me';
import WorkExperience from '@src/components/resume/work-experience';
import Education from '@src/components/resume/education';
import { ResumeData } from '@src/types/resume';

export default async function Page() {
  const assetsDir = path.join(process.cwd(), 'src/assets');
  const dataFile = path.join(assetsDir, 'resume.json');

  const data = fs.readFileSync(dataFile, 'utf-8');
  const { aboutMe, workExperience, education }: ResumeData = JSON.parse(
    data,
  ) as ResumeData;

  return (
    <section id="resume">
      <AboutMe {...aboutMe} />
      <WorkExperience workExperience={workExperience} />
      <Education education={education} />
    </section>
  );
}
