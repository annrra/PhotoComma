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
}

export type GetPostResponse = {
  post: Post | null
}

export type PostProps = {
  params: {
    slug: string;
  };
}