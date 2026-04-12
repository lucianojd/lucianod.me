export interface NasaMedia {
  date: string;
  explanation: string;
  service_version: string;
  title: string;
  media_type: 'image' | 'video' | 'other';
}

export interface NasaImage extends NasaMedia {
  media_type: 'image';
  copyright: string;
  hdurl: string;
  url: string;
}

export interface NasaVideo extends NasaMedia {
  media_type: 'video';
  url: string;
}

export interface NasaOther extends NasaMedia {
  media_type: 'other';
}

export type ApodAPIResponse = {
  data: NasaMedia;
  info: {
    rateLimitRemaining: number;
  };
};
