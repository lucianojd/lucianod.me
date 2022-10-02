// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { promises } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

const URI = "https://api.nasa.gov/planetary/apod";

type PhotoOfTheDay = {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  title: string;
  url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PhotoOfTheDay>
) {
  const key =
    process.env.MODE === "dev"
      ? process.env.NASA_API_KEY
      : await promises.readFile(`${process.env.SECRETS}/nasa_api_key`, "utf-8");

  await axios
    .get(URI, {
      params: {
        api_key: key,
      },
    })
    .then((apiRes) => {
      const { data } = apiRes;

      res.status(200).json({
        date: data.date,
        explanation: data.explanation,
        hdurl: data.hdurl,
        media_type: data.media_type,
        title: data.title,
        url: data.url,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
}
