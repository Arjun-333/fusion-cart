import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import ShopSection from "../components/ShopSection";

export default function Electronics() {
  const categories = [
    { name: "Smartphones", image: "https://via.placeholder.com/250" },
    { name: "Laptops", image: "https://via.placeholder.com/250" },
    { name: "Accessories", image: "https://via.placeholder.com/250" },
  ];

  const featuredProduct = {
    name: "4K Smartphone",
    description:
      "Experience the best of technology with a high-resolution 4K smartphone.",
    price: "$999",
    image: "https://via.placeholder.com/500x400",
  };

  const products = [
    {
      name: "Gaming Laptop",
      price: "$1499",
      image: "https://via.placeholder.com/250",
    },
    {
      name: "Noise Cancelling Headphones",
      price: "$249",
      image: "https://via.placeholder.com/250",
    },
    {
      name: "Smartwatch",
      price: "$199",
      image: "https://via.placeholder.com/250",
    },
  ];

  return (
    <div>
      <HeroSection
        title="Latest Electronics and Gadgets"
        description="Explore top-rated electronics and cutting-edge gadgets for your modern lifestyle."
        buttonText="Shop Now"
        imageUrl="https://via.placeholder.com/500x300"
        imageAlt="Electronics Trends"
      />
      <Categories categories={categories} />
      <ShopSection featuredProduct={featuredProduct} products={products} />
    </div>
  );
}
