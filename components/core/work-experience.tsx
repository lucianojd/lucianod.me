import Box from '@components/common/box';
import { memo } from 'react';
import { WorkExperienceContent } from '../helpers';
import styles from '@styles/components/work-experience.module.scss';

interface WorkExperienceProps {
  content: WorkExperienceContent;
}

function WorkExperience({ content }: WorkExperienceProps) {
  const { company, experience, description, position } = content;

  return (
    <Box>
      <div className={styles.container}>
        <h2>{company}</h2>
        <h3>{position}</h3>
        <p>{description}</p>
        {experience.length > 0 && (
          <ul>
            {experience.map((point, index) => {
              if (typeof point === 'string') {
                return <li key={index}>{point}</li>;
              } else if (Array.isArray(point)) {
                return (
                  <ul>
                    {point.map((subpoint, index) => (
                      <li key={index}>{subpoint}</li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </ul>
        )}
      </div>
    </Box>
  );
}

export default memo(WorkExperience);
