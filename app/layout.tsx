import type { Metadata } from 'next';
import '@src/styles/globals.scss';
import Footer from '@src/components/footer';
import Header from '@src/components/header';
import Script from 'next/script';
import { CLOUD_FLARE_TURNSTILE } from '@src/constants';
import QueryClientProviderWrapper from '@src/components/query-client-provider';

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
        <QueryClientProviderWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
