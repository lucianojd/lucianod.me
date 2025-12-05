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

type AboutMe = {
  description: string;
};

type Education = {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
};

export const getStaticProps: GetStaticProps<{
  workExperience: WorkExperience[];
  aboutMe: AboutMe;
  education: Education[];
}> = async () => {
  const assetsDir = path.join(process.cwd(), 'assets');
  const professionalExperienceFile = path.join(assetsDir, 'home.json');

  const data = fs.readFileSync(professionalExperienceFile, 'utf-8');
  const { workExperience, aboutMe, education } = JSON.parse(data);

  return {
    props: {
      workExperience,
      aboutMe,
      education,
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  workExperience,
  aboutMe,
  education,
}) => {
  return (
    <PageWrapper head={{ content: 'This is the home page.' }}>
      <Header />
      <Navbar />
      <main>
        <h1>About me</h1>
        <p>{aboutMe.description}</p>
        <h1>Professional Experience</h1>
        {workExperience.map(
          (
            { company, position, location, startDate, endDate, experience },
            i
          ) => {
            return (
              <div key={i}>
                <h2>
                  {company} - {position}; {location}
                </h2>
                <h3>
                  {startDate} - {endDate}
                </h3>
                <ul>
                  {experience.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          }
        )}
        <h1>Education</h1>
        {education.map(({ institution, degree, endDate, startDate }, index) => (
          <div key={index}>
            <h2>{institution}</h2>
            <h3>
              {degree}; {startDate} - {endDate}
            </h3>
          </div>
        ))}
      </main>
      <Footer />
    </PageWrapper>
  );
};

export default Home;
