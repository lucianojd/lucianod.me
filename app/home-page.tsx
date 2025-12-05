'use client';

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

type HomePageProps = {
  workExperience: WorkExperience[];
  education: Education[];
  aboutMe: AboutMe;
};

export default function HomePage({
  workExperience,
  education,
  aboutMe,
}: HomePageProps) {
  return (
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
  );
}
