export type FeaturedImageNode = {
  altText: string;
  databaseId: number;
  sourceUrl: string;
  slug: string;
  title: string;
  mediaDetails: ImageMediaDetails;
}

export type ImageMediaDetails = {
  width: number;
  height: number;
}

export type Category = {
  name: string;
  slug: string;
}

export type Post = {
  title: string;
  excerpt?: string | null;
  id: string;
  databaseId: number;
  status: string;
  slug: string;
  featuredImage: {
    node: FeaturedImageNode;
  } | null;
  categories: {
    nodes: Category[];
  }
}

export type NavigationPost = Pick<Post, 'title' | 'slug' | 'databaseId'>;

export type PostViewProps = {
  post: Post;
  prevPost?: NavigationPost | null;
  nextPost?: NavigationPost | null;
  randomPosts?: Post[];
  categorySlug?: string | null;
};

export type GetPostResponse = {
  post: Post | null;
}