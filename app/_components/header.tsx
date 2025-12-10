import Image from 'next/image';
import { JSX } from 'react';

function Header(): JSX.Element {
  return (
    <header>
      <div>
        <h1>Luciano De Gianni</h1>
        <h2>Software Engineer</h2>
      </div>
      <div className="image-container">
        <Image
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          loading='eager'
          alt="Cubed Earth image"
          src="/cubed_earth.png"
          placeholder="empty"
        />
      </div>
    </header>
  );
}

export default Header;
