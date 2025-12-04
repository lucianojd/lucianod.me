import { NextPage } from 'next';
import PageWrapper from '@components/page-wrapper';
import Header from '@components/header';
import Navbar from '@components/navbar';

const Experience: NextPage = () => {
  return (
    <PageWrapper
      head={{
        title: 'project',
        content: 'Page containing a list of my projects.',
      }}
    >
      <Header />
      <Navbar />
    </PageWrapper>
  );
};

export default Experience;
