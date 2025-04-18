// src/app/components/ProductCard.js
export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-gray-500 mt-1">{product.description}</p>
      <p className="text-xl font-bold mt-2">${product.price}</p>
      <button className="bg-yellow-400 text-white rounded-full px-4 py-2 mt-4 hover:bg-yellow-500">
        Add to Cart
      </button>
    </div>
  );
}
