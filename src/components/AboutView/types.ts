export type FeaturedMediaNode = {
  altText: string;
  file: string;
  filePath: string;
  fileSize: number;
  databaseId: number;
  sourceUrl: string;
  slug: string;
  srcSet: string;
  title: string;
};

export type FeaturedMedia = {
  node: FeaturedMediaNode;
};

export type AboutPage = {
  nextAboutSectionOne: string;
  nextAboutSectionTwo: string;
  nextAboutFeaturedMedia: FeaturedMedia;
};

export type PostViewProps = {
  page: AboutPage;
};