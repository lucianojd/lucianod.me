import Box from '@components/Box';
import { memo } from 'react';

interface TextBlockProps {
  title: string;
  content: string[];
}

function TextBlock({ title, content }: TextBlockProps) {
  return (
    <Box>
      <h2>{title}</h2>
      {content.map((contentString, index) => (
        <p key={index}>{contentString}</p>
      ))}
    </Box>
  );
}

export default memo(TextBlock);
