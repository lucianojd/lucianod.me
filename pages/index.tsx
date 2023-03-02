import { NextPage } from "next";
import { SITE_NAME } from "../components/constants";
import Hero from "../components/Hero";
import Head from "next/head";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>{SITE_NAME}</title>
        <meta name="description" content="My portfolio." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Hero title={`Welcome to ${SITE_NAME}`}/>
      </header>
      <main>

      </main>
      <footer>
        {SITE_NAME}
      </footer>
    </div>
  );
};

export default Home;
