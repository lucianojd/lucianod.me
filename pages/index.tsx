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
import Technologies from '@components/core/technologies';

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
    <PageWrapper head={{ content: 'This is the home page.' }}>
      <Technologies />
      {txtContent.map((content, index) => (
        <TextBlock key={index} {...content} />
      ))}
    </PageWrapper>
  );
};

export default Home;
