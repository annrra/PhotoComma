export type FeaturedMediaNode = {
  altText: string;
  databaseId: number;
  sourceUrl: string;
  slug: string;
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