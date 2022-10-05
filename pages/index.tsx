import axios from "axios";
import { promises } from "fs";
import type { InferGetServerSidePropsType, NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styles from "../styles/Home.module.scss";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const key =
    process.env.MODE === "dev"
      ? process.env.NASA_API_KEY
      : await promises.readFile(`${process.env.SECRETS}/nasa_api_key`, "utf-8");

  const URI = "https://api.nasa.gov/planetary/apod";

  const res = await axios.get(URI, {
    params: {
      api_key: key,
    },
  });
  const data = res.data;

  const isPhoto = data.media_type === "image";

  return { props: { data, isPhoto } };
};

const Home: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { data, isPhoto } = props;

  const [showPhoto, setShowPhoto] = useState<boolean>(true);

  useEffect(() => {
    setShowPhoto(isPhoto);
  }, [isPhoto]);

  return (
    <div className={styles.container}>
      <Head>
        <title>home</title>
        <meta name="description" content="My portfolio." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to lucianod.me</h1>
        {data ? (
          <div className={styles.pod}>
            <h2 className={styles.title}>{`Here is your ${
              showPhoto ? "photo" : "video"
            } of the day`}</h2>
            {showPhoto ? (
              <Link href={data.hdurl ?? ""}>
                <a>
                  <div className={styles.photo}>
                    <Image
                      priority
                      layout="fill"
                      objectFit="contain"
                      src={data.url}
                      alt={"Photo of the day could not be loaded"}
                    />
                  </div>
                </a>
              </Link>
            ) : (
              <ReactPlayer controls url={data.url ?? ""} />
            )}
            <p>{data.explanation}</p>
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
