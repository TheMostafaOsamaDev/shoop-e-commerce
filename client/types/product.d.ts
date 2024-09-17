interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  images: { url: string; id: string; isExternal: boolean }[];
  category: string;
  subCategory: string;
}

type HomeProducts = {
  topSold: Product[];
  topRated: Product[];
  featured: Product[];
};
