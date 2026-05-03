export type CategoryPost = {
  title: string
  slug: string
  databaseId: number
  featuredImage: {
    node: {
      title: string
      sourceUrl: string
      slug: string
      altText: string
      mediaDetails: {
        sizes: [{
          sourceUrl: string
        }]
      }
    }
  } | null
}

export type Category = {
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