import Box from '@components/Box';
import { memo } from 'react';

function Education() {
  return (
    <Box>
      <h2>Education</h2>
      <h3>{"Bachelor's of Software Engineering"}</h3>
      <h3>University of Victoria, Graduated April 2022</h3>
    </Box>
  );
}

export default memo(Education);
