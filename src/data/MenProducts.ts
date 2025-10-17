import graycap from "../assets/images/gray-cap.png";
import airforce from "../assets/images/airforce.jpeg";
import blackTshirt from "../assets/images/black-tshirt.png";
import beachShorts from "../assets/images/beachShort.jpg";
import sneakers from "../assets/images/running-sneakers.jpg";
import blueTshirt from "../assets/images/blueTshirt.jpeg";
import menGlasses from "../assets/images/glassesMen.png";
import festinaWatch from "../assets/images/festinaWatch.jpg"
import { Product } from "../types/product";

const MenProducts: Product[] = [
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
    title: "Classic T-Shirt",
    description: "100% cotton, premium quality.",
    category: "men",
    price: 19.99,
    image: blackTshirt,
  },
  {
    id: 4,
    title: "Beach Shorts",
    description: "100% premium quality, waterproof.",
    category: "men",
    price: 17.99,
    image: beachShorts,
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
    title: "Nike Airforce One",
    description: "Commfortable, 100% american quality",
    category: "men",
    price: 39.99,
    image: airforce,
  },
  {
    id: 7,
    title: "Black Eyeglasses",
    description:
      "The eyewear we create is a symbol of pure freedom to be yourself.",
    category: "men",
    price: 45.99,
    image: menGlasses,
  },
  {
    id: 8,
    title: "Festina Chrono Dark Blue Watch",
    description: "Steel case 43.5mm, blue Dial.",
    category: "men",
    price: 134.99,
    image: festinaWatch,
  },
];

export default MenProducts;
