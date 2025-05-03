export default function Electronics() {
  return (
    <div className="container">
      {/* Header */}
      <header>
        <div className="logo">FusionCart</div>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search Electronics..."
          />
          <span className="search-icon">&#128269;</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-text">
            <h1>Latest Electronics and Gadgets</h1>
            <p>
              Explore top-rated electronics and cutting-edge gadgets for your
              modern lifestyle.
            </p>
            <button className="hero-btn">Shop Now</button>
          </div>
          <div className="hero-image">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Electronics Trends"
            />
          </div>
        </div>

        {/* Electronics Categories */}
        <div className="categories">
          <div className="category-card">
            <img src="https://via.placeholder.com/250" alt="Smartphones" />
            <div className="category-name">Smartphones</div>
          </div>
          <div className="category-card">
            <img src="https://via.placeholder.com/250" alt="Laptops" />
            <div className="category-name">Laptops</div>
          </div>
          <div className="category-card">
            <img src="https://via.placeholder.com/250" alt="Accessories" />
            <div className="category-name">Accessories</div>
          </div>
        </div>

        {/* Featured Product Section */}
        <div className="featured-product">
          <div className="product-image">
            <img src="https://via.placeholder.com/500x400" alt="Smartphone" />
          </div>
          <div className="product-details">
            <h2>4K Smartphone</h2>
            <p>
              Experience the best of technology with a high-resolution 4K
              smartphone.
            </p>
            <div className="product-price">$999</div>
            <button className="product-btn">Add to Cart</button>
          </div>
        </div>

        {/* Masonry Grid of Electronics Items */}
        <div className="masonry-grid">
          <div className="product-card">
            <img src="https://via.placeholder.com/250" alt="Laptop" />
            <div className="product-info">
              <h3>Gaming Laptop</h3>
              <p>$1499</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/250" alt="Headphones" />
            <div className="product-info">
              <h3>Noise Cancelling Headphones</h3>
              <p>$249</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/250" alt="Smartwatch" />
            <div className="product-info">
              <h3>Smartwatch</h3>
              <p>$199</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-text">
          © 2025 Fusion Cart. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
