export type ProductAttribute = {
  nodes: {
    name: string;
    value: string;
  }[];
};

export type ProductVariation = {
  id: string;
  price: string;
  attributes: ProductAttribute;
};

export type ProductImage = {
  node: {
    sourceUrl: string;
    altText: string | null;
    title: string | null;
  };
};

export type Product = {
  title: string;
  uri: string;
  databaseId: number;
  status: string;

  variations?: {
    nodes: ProductVariation[];
  };

  featuredImage?: ProductImage;
};

export type ProductsResponse = {
  products: {
    nodes: Product[];
  };
};