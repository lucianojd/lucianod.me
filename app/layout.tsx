import type { Metadata } from 'next';
import '@styles/globals.scss';
import Footer from './_components/footer';
import Header from './_components/header';
import Navbar from './_components/navbar';

export const metadata: Metadata = {
  title: 'lucianod.me',
  description: 'Personal website of Luciano De Gianni',
  authors: [
    {
      name: 'Luciano De Gianni',
      url: 'https://www.linkedin.com/in/lucianojd/',
    },
  ],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
