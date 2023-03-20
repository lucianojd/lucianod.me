import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import path from 'path';
import {
  parseWorkExperienceJSON,
  WorkExperienceContent,
} from '@components/helpers';
import { promises as fs } from 'fs';
import Education from '@components/elements/Education';
import WorkExperience from '@components/elements/WorkExperience';
import PageWrapper from '@components/core/PageWrapper';

interface ExperienceStaticProps {
  workExperience: Array<WorkExperienceContent>;
}

export const getStaticProps: GetStaticProps<
  ExperienceStaticProps
> = async () => {
  const workExperienceFilePath = path.join(
    process.cwd(),
    'resources/json/work.json'
  );
  const jsonContent = await fs.readFile(workExperienceFilePath, 'utf-8');
  const workExperience = parseWorkExperienceJSON(jsonContent);

  return {
    props: {
      workExperience,
    },
  };
};

const Experience: NextPage<ExperienceStaticProps> = ({
  workExperience,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageWrapper
      head={{ content: 'This page contains my education and work experience.' }}
    >
      {workExperience.map((content, index) => (
        <WorkExperience key={index} content={content} />
      ))}
      <Education />
    </PageWrapper>
  );
};

export default Experience;
