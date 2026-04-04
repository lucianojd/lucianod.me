import { JSX } from 'react';
import Icon from './icon';

function Header(): JSX.Element {
  return (
    <header>
      <div>
        <h1>Luciano De Gianni</h1>
        <h2>Software Engineer</h2>
      </div>
      <div className="image-container">
        <Icon name="earth" />
      </div>
    </header>
  );
}

export default Header;
