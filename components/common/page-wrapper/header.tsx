import Navbar from './navbar';

function Header(): JSX.Element {
  const navItems: {name: string, path: string}[] = [];
  return (
    <>
      <header>
        <Navbar items={navItems} />
      </header>
    </>
  );
}

export default Header;
