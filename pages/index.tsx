import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const { data: res, isLoading } = useQuery("pod", () =>
    axios.get("/api/nasa/pod")
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>home</title>
        <meta name="description" content="My portfolio." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to lucianod.me</h1>
        {!isLoading && res?.data ? (
          <div className={styles.pod}>
            <h2 className={styles.title}>Here is your photo of the day</h2>
            <div className={styles.photo}>
              <Link href={res?.data.hdurl}>
                <Image
                  layout="fill"
                  objectFit="contain"
                  src={res?.data.url}
                  alt={"Photo of the day could not be loaded"}
                />
              </Link>
            </div>
            <p>{res?.data.explanation}</p>
          </div>
        ) : isLoading ? (
          <div className={styles.pod}>
            <h2 className={styles.title}>Here is your photo of the day</h2>
          </div>
        ) : (
          <div className={styles.pod}>
            <h2 className={styles.title}>
              {"Couldn't get the photo of the day."}
            </h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
