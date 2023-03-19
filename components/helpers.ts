export interface ParagraphContent {
  title: string;
  content: string[];
}

export const parseTXT = (text: string): ParagraphContent => {
  const splitContent = text
    .split(/(?<=\n)\n/)
    .map((content) => content.replace(/\n/, ' '));

  return {
    title: splitContent[0],
    content: splitContent.slice(1),
  };
};

export interface WorkExperienceContent {
  company: string;
  position: string;
  description: string;
  experience: Array<{
    title: string;
    points: Array<string>;
  }>;
}

export const parseWorkExperienceJSON = (
  text: string
): Array<WorkExperienceContent> => {
  return JSON.parse(text);
};
