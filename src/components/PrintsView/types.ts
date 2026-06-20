export type ProductAttributeNode = {
  name: string;
  value: string;
};

export type ProductAttribute = {
  nodes: ProductAttributeNode[];
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
  slug: string;
  databaseId: number;
  status: string;

  defaultAttributes?: {
    nodes: ProductAttributeNode[];
  };

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