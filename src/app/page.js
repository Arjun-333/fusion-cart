// src/app/page.js
import ProductCard from "../components/ProductCard";

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "This is a sample product.",
      price: "19.99",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is another sample product.",
      price: "29.99",
      image: "https://via.placeholder.com/200",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
