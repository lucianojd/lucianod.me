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
          <a href={page.link}>
            <li key={page.name}>{page.name}</li>
          </a>
        ))}
      </ul>
    </span>
  );
}

export default Navbar;
