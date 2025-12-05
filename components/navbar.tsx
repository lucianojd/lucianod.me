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
          <a key={page.name} href={page.link}>
            <li>{page.name}</li>
          </a>
        ))}
      </ul>
    </span>
  );
}

export default Navbar;
