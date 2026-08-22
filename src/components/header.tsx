import { JSX } from 'react';
import Icon from './icon';

function Header(): JSX.Element {
  return (
    <header className='header'>
      <div>
        <h1>Luciano De Gianni</h1>
        <h2>Software Engineer</h2>
      </div>
      <Icon loading="eager" containerClassName="image-container" name="earth" />
    </header>
  );
}

export default Header;
