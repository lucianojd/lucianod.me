import { NextPage } from 'next';
import PageWrapper from '@components/page-wrapper';
import Header from '@components/header';
import Navbar from '@components/navbar';

const Experience: NextPage = () => {
  return (
    <PageWrapper head={{ content: 'Form for contacting me.' }}>
      <Header />
      <Navbar />
      <main></main>
    </PageWrapper>
  );
};

export default Experience;
