import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <main>
      <h1>Projects</h1>
      <p>
        Welcome to the Projects Page. Here you will find a list of my projects.
      </p>
      <h1>More about me</h1>
      <ul>
        <li>
          <Link href="https://github.com/lucianojd">My GitHub profile</Link>
        </li>
        <li>
          <Link href="https://www.linkedin.com/in/lucianojd/">
            My LinkedIn profile
          </Link>
        </li>
      </ul>
    </main>
  );
}
