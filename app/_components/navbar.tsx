import Link from 'next/link';

function Navbar() {
  const pages = [
    { name: 'Home', link: '/' },
    { name: 'Projects', link: '/projects' },
    { name: 'Contact', link: '/contact' },
  ];

  return (
    <span className="navbar">
      <ul>
        {pages.map((page) => (
          <Link key={page.name} href={page.link}>
            <li>{page.name}</li>
          </Link>
        ))}
      </ul>
    </span>
  );
}

export default Navbar;
