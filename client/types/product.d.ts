interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  images: { name: string; id: string }[];
  category: string;
  subCategory: string;
}
