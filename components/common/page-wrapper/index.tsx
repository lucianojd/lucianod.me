import { SITE_NAME } from '@components/constants';
import Header from './header';

import { memo } from 'react';
import Head from 'next/head';
import Footer from './footer';

interface PageWrapperProps {
  children: React.ReactNode;
  head: {
    title: string;
    content: string;
  };
}

function PageWrapper({
  children,
  head: { content, title = SITE_NAME },
}: PageWrapperProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
        <meta name="author" content="Luciano De Gianni" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default memo(PageWrapper);
