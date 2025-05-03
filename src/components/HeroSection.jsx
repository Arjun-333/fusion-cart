import React from "react";

const HeroSection = ({
  title,
  description,
  buttonText,
  imageUrl,
  imageAlt,
}) => {
  return (
    <section className="hero-section flex items-center justify-between p-8 bg-gradient-to-r from-beige-100 to-yellow-100 rounded-lg shadow-md mb-8">
      <div className="hero-text max-w-lg">
        <h1 className="text-4xl font-bold mb-4 text-yellow-900">{title}</h1>
        <p className="text-yellow-800 mb-6">{description}</p>
        <button className="hero-btn bg-yellow-900 text-beige-100 px-6 py-3 rounded hover:bg-yellow-800 transition">
          {buttonText}
        </button>
      </div>
      <div className="hero-image max-w-md">
        <img src={imageUrl} alt={imageAlt} className="rounded-lg shadow-lg" />
      </div>
    </section>
  );
};

export default HeroSection;
