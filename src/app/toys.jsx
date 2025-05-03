import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import ShopSection from "../components/ShopSection";

export default function Toys() {
  const categories = [
    { name: "Action Figures", image: "https://via.placeholder.com/250" },
    { name: "Educational", image: "https://via.placeholder.com/250" },
    { name: "Outdoor", image: "https://via.placeholder.com/250" },
  ];

  const featuredProduct = {
    name: "Remote Control Car",
    description: "High-speed remote control car with rechargeable battery.",
    price: "$59",
    image: "https://via.placeholder.com/500x400",
  };

  const products = [
    {
      name: "Building Blocks",
      price: "$29",
      image: "https://via.placeholder.com/250",
    },
    {
      name: "Puzzle Set",
      price: "$19",
      image: "https://via.placeholder.com/250",
    },
    {
      name: "Stuffed Animals",
      price: "$15",
      image: "https://via.placeholder.com/250",
    },
  ];

  return (
    <div>
      <HeroSection
        title="Fun and Educational Toys"
        description="Discover toys that inspire creativity and learning."
        buttonText="Shop Now"
        imageUrl="https://via.placeholder.com/500x300"
        imageAlt="Toys Collection"
      />
      <Categories categories={categories} />
      <ShopSection featuredProduct={featuredProduct} products={products} />
    </div>
  );
}
