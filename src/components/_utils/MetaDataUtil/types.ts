type MetaImage = {
  node?: {
    sourceUrl: string;
    title: string;
    altText: string;
  };
}

type MetaData = {
  metaTitle: string;
  metaDescription: string;
  metaOpengraphimage?: MetaImage;
}

type MetaPost = {
  title: string;
  excerpt: string;
  meta: MetaData;
}

export type MetaResponse = {
  post: MetaPost;
}

type OpenGraphImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
}

type OpenGraphMetadata = {
  title: string;
  description: string;
  images?: OpenGraphImage[];
}

type TwitterMetadata = {
  card: 'summary' | 'summary_large_image';
  title: string;
  description: string;
  images?: string[];
};

export type PageMetadata = {
  title: string;
  description: string;
  alternates?: {
    canonical: string;
  };
  openGraph: OpenGraphMetadata;
  twitter: TwitterMetadata;
}