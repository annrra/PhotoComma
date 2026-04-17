export type FeaturedImageNode = {
  altText: string
  caption?: string | null
  databaseId: number
  file: string
  filePath: string
  fileSize: number
  link: string
  sourceUrl: string
  slug: string
  srcSet: string
  title: string
  uri: string
}

export type Category = {
  name: string
  slug: string
}

export type Post = {
  title: string
  uri: string
  content?: string | null
  excerpt?: string | null
  guid: string
  id: string
  link: string
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