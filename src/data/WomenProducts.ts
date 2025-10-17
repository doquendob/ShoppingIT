import pinkHoodie from "../assets/images/pink-hoodiee.jpeg";
import bluePrintPants from "../assets/images/blue-print-pants.png";
import summerDress from "../assets/images/summerDress.jpg";
import leatherHandbag from "../assets/images/leatherBag.jpg";
import highHeels from "../assets/images/elegantHeels.jpg";
import silkScarf from "../assets/images/silkScarf.jpg";
import workoutLeggings from "../assets/images/leggings.jpg";
import knittedSweater from "../assets/images/knitWomen.jpeg";
import { Product } from "../types/product";

const WomenProducts: Product[] = [
  {
    id: 1,
    title: "Women's Pink Hoodie",
    description: "Soft fleece interior with a comfortable fit.",
    category: "women",
    price: 32.99,
    image: pinkHoodie,
  },
  {
    id: 2,
    title: "Floral Print Pants",
    description: "Elastic waist floral print pants for comfortable wear.",
    category: "women",
    price: 21.99,
    image: bluePrintPants,
  },
  {
    id: 3,
    title: "Summer Floral Dress",
    description: "Lightweight and breathable floral dress perfect for summer.",
    category: "women",
    price: 34.99,
    image: summerDress,
  },
  {
    id: 4,
    title: "Leather Crossbody Bag",
    description: "Genuine leather handbag with adjustable strap.",
    category: "women",
    price: 49.99,
    image: leatherHandbag,
  },
  {
    id: 5,
    title: "Elegant High Heels",
    description: "Comfortable heels with cushioned insoles for all-day wear.",
    category: "women",
    price: 59.99,
    image: highHeels,
  },
  {
    id: 6,
    title: "Silk Patterned Scarf",
    description: "Luxurious silk scarf with elegant patterns.",
    category: "women",
    price: 24.99,
    image: silkScarf,
  },
  {
    id: 7,
    title: "Yoga Workout Leggings",
    description: "High-waisted leggings with moisture-wicking fabric.",
    category: "women",
    price: 28.99,
    image: workoutLeggings,
  },
  {
    id: 8,
    title: "Cable Knit Sweater",
    description: "Warm and cozy knitted sweater for cold weather.",
    category: "women",
    price: 42.99,
    image: knittedSweater,
  },
];

export default WomenProducts;
