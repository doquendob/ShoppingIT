export interface Product {
  id: number;
  title: string;
  description: string;
  category: "men" | "women";
  price: number;
  image: string;
}