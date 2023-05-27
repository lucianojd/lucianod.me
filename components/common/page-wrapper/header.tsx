import Navbar from './navbar';

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
      <Navbar items={navItems} />
    </header>
  );
}

export default Header;
