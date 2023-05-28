import Box from '@components/common/box';
import { memo } from 'react';

function Education() {
  return (
    <Box>
      <h2>Education</h2>
      <h3>{"Bachelor's of Software Engineering"}</h3>
      <h4>Specialized in Cybersecurity and Privacy</h4>
      <h4>University of Victoria, Graduated April 2022</h4>
    </Box>
  );
}

export default memo(Education);
