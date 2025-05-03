import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import ShopSection from "../components/ShopSection";

export default function Furniture() {
  const categories = [
    { name: "Living Room", image: "https://via.placeholder.com/250" },
    { name: "Bedroom", image: "https://via.placeholder.com/250" },
    { name: "Office", image: "https://via.placeholder.com/250" },
  ];

  const featuredProduct = {
    name: "Modern Sofa",
    description: "Comfortable and stylish modern sofa for your living room.",
    price: "$799",
    image: "https://via.placeholder.com/500x400",
  };

  const products = [
    {
      name: "Dining Table",
      price: "$499",
      image: "https://via.placeholder.com/250",
    },
    {
      name: "Office Chair",
      price: "$199",
      image: "https://via.placeholder.com/250",
    },
    {
      name: "Bookshelf",
      price: "$299",
      image: "https://via.placeholder.com/250",
    },
  ];

  return (
    <div>
      <HeroSection
        title="Stylish Furniture for Every Room"
        description="Explore our collection of modern and classic furniture pieces."
        buttonText="Shop Now"
        imageUrl="https://via.placeholder.com/500x300"
        imageAlt="Furniture Trends"
      />
      <Categories categories={categories} />
      <ShopSection featuredProduct={featuredProduct} products={products} />
    </div>
  );
}
