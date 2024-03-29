import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import path from 'path';
import {
  parseWorkExperienceJSON,
  WorkExperienceContent,
} from '@components/helpers';
import { promises as fs } from 'fs';
import Education from '@components/core/education';
import WorkExperience from '@components/core/work-experience';
import PageWrapper from '@components/common/page-wrapper';

interface ExperienceStaticProps {
  workExperience: Array<WorkExperienceContent>;
}

export const getStaticProps: GetStaticProps<
  ExperienceStaticProps
> = async () => {
  const workExperienceFilePath = path.join(
    process.cwd(),
    'assets/json/work.json'
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
