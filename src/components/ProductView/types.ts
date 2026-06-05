export type ProductVariation = {
  id: string;
  price: string;
  attributes: {
    nodes: {
      name: string;
      value: string;
    }[];
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

  description?: string;
  shortDescription?: string;

  variations?: {
    nodes: ProductVariation[];
  };

  featuredImage?: ProductImage;
};

export type GetProductResponse = {
  product: Product | null;
}