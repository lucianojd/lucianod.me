import { SITE_NAME } from '@components/constants';
import Education from '@components/Education';
import Footer from '@components/Footer';
import Header from '@components/Header';
import {
  ParagraphContent,
  parseTXT,
  parseWorkExperienceJSON,
  WorkExperienceContent,
} from '@components/helpers';
import TextBlock from '@components/TextBlock';
import WorkExperience from '@components/WorkExperience';
import { promises as fs } from 'fs';
import {
  type GetStaticProps,
  type InferGetStaticPropsType,
  type NextPage,
} from 'next';
import Head from 'next/head';
import path from 'path';

interface HomeStaticProps {
  txtContent: Array<ParagraphContent>;
  workExperience: Array<WorkExperienceContent>;
}

export const getStaticProps: GetStaticProps<HomeStaticProps> = async () => {
  const homeTxtDir = path.join(process.cwd(), 'resources/txt/home');
  const txtFileNames = await fs.readdir(homeTxtDir);

  const txtContent = await Promise.all(
    txtFileNames.map(async (fileName) => {
      const filePath = path.join(homeTxtDir, fileName);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const parsedContent = parseTXT(fileContent);
      return parsedContent;
    })
  );

  const workExperienceFilePath = path.join(
    process.cwd(),
    'resources/json/work.json'
  );
  const jsonContent = await fs.readFile(workExperienceFilePath, 'utf-8');
  const workExperience = parseWorkExperienceJSON(jsonContent);

  return {
    props: {
      txtContent,
      workExperience,
    },
  };
};

const Home: NextPage<HomeStaticProps> = ({
  txtContent,
  workExperience,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Head>
        <title>{SITE_NAME}</title>
        <meta name="description" content="My portfolio." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
        <main>
          {txtContent.map((content, index) => (
            <TextBlock key={index} {...content} />
          ))}
          <Education />
          {workExperience.map((content, index) => (
            <WorkExperience key={index} content={content} />
          ))}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
