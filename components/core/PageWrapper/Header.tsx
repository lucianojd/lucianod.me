import { SITE_NAME } from '@components/constants';
import Hero from '@components/core/Hero';
import Navbar from './Navbar';

function Header(): JSX.Element {
  const navItems = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Experience',
      path: '/experience',
    },
  ];
  return (
    <header>
      <Hero title={SITE_NAME} />
      <Navbar items={navItems} />
    </header>
  );
}

export default Header;
