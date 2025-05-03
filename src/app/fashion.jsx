import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import ShopSection from "../components/ShopSection";

export default function Fashion() {
  const categories = [
    { name: "Category 1", image: "https://via.placeholder.com/250" },
    {
      name: "Designer Sneakers",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBK0VWs2u0-bEvSyNlzCEUACja7vyFswky7A&s",
    },
    {
      name: "Comfortable Joggers",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmSOcvuwYejobWdE8U2H6x71NP5cf0TmSpmA&s",
    },
  ];

  const featuredProduct = null; // No featured product in original

  const products = []; // No separate products in original, so empty

  return (
    <div>
      <HeroSection
        title="Discover the Latest in Fashion"
        description="Browse our curated collection for a touch of style, comfort, and elegance."
        buttonText="Shop Now"
        imageUrl="https://safaaworld.com/cdn/shop/articles/safaa_blog_indian_wear.jpg?v=1714716489"
        imageAlt="Fashion Trends"
      />
      <Categories categories={categories} />
      {featuredProduct && (
        <ShopSection featuredProduct={featuredProduct} products={products} />
      )}
    </div>
  );
}
