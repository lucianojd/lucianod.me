import { ParagraphContent, parseTXT } from '@components/helpers';
import TextBlock from '@components/core/text-block';
import { promises as fs } from 'fs';
import {
  type GetStaticProps,
  type InferGetStaticPropsType,
  type NextPage,
} from 'next';
import path from 'path';
import PageWrapper from '@components/common/page-wrapper';
import Hero from '@components/core/hero';

interface HomeStaticProps {
  txtContent: Array<ParagraphContent>;
}

export const getStaticProps: GetStaticProps<HomeStaticProps> = async () => {
  const homeTxtDir = path.join(process.cwd(), 'assets/txt/home');
  const txtFileNames = await fs.readdir(homeTxtDir);

  const txtContent = await Promise.all(
    txtFileNames.map(async (fileName) => {
      const filePath = path.join(homeTxtDir, fileName);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const parsedContent = parseTXT(fileContent);
      return parsedContent;
    })
  );

  return {
    props: {
      txtContent,
    },
  };
};

const Home: NextPage<HomeStaticProps> = ({
  txtContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageWrapper head={{ title: "home", content: 'This is the home page.' }}>
      <Hero />
    </PageWrapper>
  );
};

export default Home;
