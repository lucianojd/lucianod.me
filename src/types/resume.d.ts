export interface WorkExperience {
  company: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
  experience: string[];
}

export interface AboutMe {
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface ResumeData {
  workExperience: WorkExperience[];
  education: Education[];
  aboutMe: AboutMe;
}
