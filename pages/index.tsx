import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import PageWrapper from '@components/page-wrapper';
import Header from '@components/header';
import Navbar from '@components/navbar';
import Footer from '@components/footer';
import fs from 'fs';
import path from 'path';

type WorkExperience = {
  company: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
  experience: string[];
};

export const getStaticProps: GetStaticProps<{
  workExperience: WorkExperience[];
}> = async () => {
  const assetsDir = path.join(process.cwd(), 'assets');
  const professionalExperienceFile = path.join(assetsDir, 'professional_experience.json');

  const data = fs.readFileSync(professionalExperienceFile, 'utf-8');
  const parsedData = JSON.parse(data);

  return {
    props: {
      workExperience: parsedData,
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({workExperience}) => {
  return (
    <PageWrapper head={{ title: 'home', content: 'This is the home page.' }}>
      <Header />
      <Navbar />
      <main>
        <h1>About me</h1>
        <p>
          I am software engineer who has been working in the industry since
          2019. I started my journey as a QA Analyst during my co-op program at
          the University of Victoria (UVic) and since then have had multiple
          software development roles.
        </p>
        <h1>Professional Experience</h1>
        {workExperience.map(({company, position, location, startDate, endDate, experience}, i) => {
          return (
            <div key={i}>
              <h2>{company} - {position}; {location}</h2>
              <h3>{startDate} - {endDate}</h3>
              <ul>
                {experience.map((item, index) => (<li key={index}>{item}</li>))}
              </ul>
            </div>
          )
        })}
        <h1>Education</h1>
        <h2>University of Victoria</h2>
        <h3>
          Bachelor of Software Engineering, Co-op Program; Sept. 2018 - April
          2022
        </h3>
        <h2>University of the Fraser Valley</h2>
        <h3>
          Completed the Engineering Transfer program; Sept. 2016 - April 2018
        </h3>
      </main>
      <Footer />
    </PageWrapper>
  );
};

export default Home;
