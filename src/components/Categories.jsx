import React from "react";

const Categories = ({ categories }) => {
  return (
    <section className="categories grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {categories.map((category, index) => (
        <div
          key={index}
          className="category-card bg-beige-100 rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-48 object-cover"
          />
          <div className="category-name p-4 text-center font-semibold text-yellow-900">
            {category.name}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Categories;
