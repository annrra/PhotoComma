export type FeaturedImageNode = {
  altText: string
  databaseId: number
  sourceUrl: string
  slug: string
  title: string
}

export type Category = {
  name: string
  slug: string
}

export type Post = {
  title: string
  excerpt?: string | null
  id: string
  databaseId: number
  status: string
  slug: string
  featuredImage: {
    node: FeaturedImageNode
  } | null
  categories: {
    nodes: Category[]
  }
}

export type PostViewProps = {
  post: Post;
  prevPost?: Post | null;
  nextPost?: Post | null;
  randomPosts?: Post[];
  categorySlug?: string | null;
};

export type GetPostResponse = {
  post: Post | null
}