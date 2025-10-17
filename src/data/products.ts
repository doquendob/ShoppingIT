import graycap from "../assets/images/gray-cap.png";
import airforce from "../assets/images/airforce.jpeg";
import blackTshirt from "../assets/images/black-tshirt.png";
import bluePrintPants from "../assets/images/blue-print-pants.png";
import pinkHoodie from "../assets/images/pink-hoodiee.jpeg";
import sneakers from "../assets/images/running-sneakers.jpg";
import blueTshirt from "../assets/images/blueTshirt.jpeg"
import { Product } from "../types/product";

const Products: Product[] = [
  {
    id: 1,
    title: "Gray Cap",
    description: "High quality gray cap",
    category: "men",
    price: 15.99,
    image: graycap,
  },
  {
    id: 2,
    title: "Blue t-shirt",
    description: "High quality cotton blue t-shirt",
    category: "men",
    price: 18.99,
    image: blueTshirt,
  },
  {
    id: 3,
    title: "Men's Classic T-Shirt",
    description: "100% cotton, premium quality.",
    category: "men",
    price: 19.99,
    image: blackTshirt,
  },
  {
    id: 4,
    title: "Women's Pink Hoodie",
    description: "Soft fleece interior with a comfortable fit.",
    category: "women",
    price: 32.99,
    image: pinkHoodie,
  },
  {
    id: 5,
    title: "Running Sneakers",
    description: "Lightweight and durable running shoes.",
    category: "men",
    price: 46.99,
    image: sneakers,
  },
  {
    id: 6,
    title: "Blue print pants",
    description: "Elastic Waist blue print pants.",
    category: "women",
    price: 21.99,
    image: bluePrintPants,
  },
  {
    id: 7,
    title: "Nike Airforce One",
    description: "Commfortable, 100% american quality",
    category: "men",
    price: 39.99,
    image: airforce,
  },
];

export default Products;
