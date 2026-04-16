export type CategoryPost = {
  title: string
  slug: string
  databaseId: number
  featuredImage: {
    node: {
      uri: string
      title: string
      sourceUrl: string
      srcSet: string
      slug: string
      guid: string
      fileSize: number
      filePath: string
      file: string
      altText: string
      caption?: string | null
    }
  } | null
}

export type Category = {
  uri: string
  slug: string
  name: string
  description?: string | null
  link: string
  posts: {
    pageInfo: {
      hasNextPage: boolean
      endCursor: string
    }
    nodes: CategoryPost[]
  }
}

export type GetCategoryResponse = {
  category: Category | null
}

export type PostProps = {
  params: {
    slug: string;
  };
}