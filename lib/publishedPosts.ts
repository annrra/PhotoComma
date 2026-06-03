type PostNode = {
  slug: string;
  modified?: string | null;
};

type PostsResponse = {
  data?: {
    posts?: {
      nodes: PostNode[];
    };
  };
  errors?: unknown;
};

export async function fetchPostsByCategory(
  apiUrl: string,
  categoryIds: number[],
  options: { includeModified?: boolean } = {},
): Promise<PostNode[]> {
  const fields = options.includeModified ? 'slug\n          modified' : 'slug';

  const query = `
    query ($cats: [ID!]) {
      posts(first: 100, where: { categoryIn: $cats, status: PUBLISH }) {
        nodes {
          ${fields}
        }
      }
    }
  `;

  const res = await fetch(`${apiUrl}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: { cats: categoryIds },
    }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error('Failed to fetch posts', await res.text());
    return [];
  }

  const data: PostsResponse = await res.json();

  if (data?.errors) {
    console.error('GraphQL errors:', data.errors);
    return [];
  }

  return data?.data?.posts?.nodes ?? [];
}

export async function fetchAllPublishedPosts(
  apiUrl: string,
  categoryIds: number[],
  options: { includeModified?: boolean } = {},
): Promise<PostNode[]> {
  const results = await Promise.all(
    categoryIds.map((id) => fetchPostsByCategory(apiUrl, [id], options)),
  );
  return results.flat();
}
