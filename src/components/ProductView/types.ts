export type ProductAttribute = {
  name: string;
  value: string;
};

export type ProductVariation = {
  databaseId: number;
  id: string;
  price: string;
  attributes: {
    nodes: ProductAttribute[];
  };
};

export type ProductImage = {
  node: {
    sourceUrl: string;
    altText?: string | null;
    title?: string | null;
  };
};

export type Product = {
  title: string;
  uri: string;
  slug: string;
  databaseId: number;

  description?: string | null;
  shortDescription?: string | null;

  defaultAttributes?: {
    nodes: ProductAttribute[];
  };

  variations?: {
    nodes: ProductVariation[];
  };

  featuredImage?: ProductImage;
};

export type GetProductResponse = {
  product: Product | null;
};