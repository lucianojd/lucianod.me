import { SITE_NAME } from '@components/constants';
import Hero from '@components/Hero';

function Header(): JSX.Element {
  return (
    <header>
      <Hero title={SITE_NAME} />
    </header>
  );
}

export default Header;
