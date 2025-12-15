import { JSX } from 'react';
import Icon from '@app/_components/Icon';

function Footer(): JSX.Element {
  return (
    <footer>
      <Icon name="earth" />
      <Icon name="github" />
      <Icon name="linkedin" />
    </footer>
  );
}

export default Footer;
