export interface APODModel {
  date: string;
  type: MediaType;
  object: string;
}

export type MediaType = 'image' | 'video' | 'other';

export interface NasaMedia {
  date: string;
  post_id: number;
  title: string;
  media_type: 'image' | 'video' | 'other';
  explanation: string;
  credit: string;
  copyright: string;
  alt: string;
  url: string;
  hdurl: string;
  basic_html: string;
  basic_html_url: string;
}

export type ApodAPIResponse = {
  data: NasaMedia;
  info: {
    rateLimitRemaining: number;
  };
};
