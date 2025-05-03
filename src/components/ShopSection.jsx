import React from "react";

const ShopSection = ({ featuredProduct, products }) => {
  return (
    <section className="shop-section">
      <div className="featured-product flex flex-col md:flex-row bg-beige-100 rounded-lg shadow-md p-6 mb-8">
        <div className="product-image md:w-1/2">
          <img
            src={featuredProduct.image}
            alt={featuredProduct.name}
            className="rounded-lg"
          />
        </div>
        <div className="product-details md:w-1/2 md:pl-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-yellow-900">
            {featuredProduct.name}
          </h2>
          <p className="text-yellow-800 mb-4">{featuredProduct.description}</p>
          <div className="product-price text-xl font-semibold mb-4 text-yellow-900">
            {featuredProduct.price}
          </div>
          <button className="product-btn bg-yellow-900 text-beige-100 px-4 py-2 rounded hover:bg-yellow-800 transition">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="masonry-grid grid grid-cols-1 sm:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="product-card bg-beige-100 rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="product-info p-4">
              <h3 className="text-lg font-semibold text-yellow-900">
                {product.name}
              </h3>
              <p className="text-yellow-800 mb-2">{product.price}</p>
              <button className="add-to-cart bg-yellow-900 text-beige-100 px-3 py-1 rounded hover:bg-yellow-800 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopSection;
