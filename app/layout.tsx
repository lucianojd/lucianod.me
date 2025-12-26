import type { Metadata } from 'next';
import '@styles/globals.scss';
import Footer from './_components/footer';
import Header from './_components/header';
import Navbar from './_components/navbar';
import Script from 'next/script';
import { CLOUD_FLARE_TURNSTILE } from './_constants';

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
      <head>
        <Script async defer src={CLOUD_FLARE_TURNSTILE.WIDGET_URL} />
      </head>
      <body>
        <Header />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
