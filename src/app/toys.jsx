import "./toys.css"; // Import the external CSS file

export default function Toys() {
  return (
    <div className="container">
      {/* Header */}
      <header>
        <div className="logo">FusionCart</div>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search Toys..."
          />
          <span className="search-icon">&#128269;</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-text">
            <h1>Fun and Educational Toys</h1>
            <p>
              Explore a range of toys for all ages, perfect for learning and
              playing.
            </p>
            <button className="hero-btn">Shop Now</button>
          </div>
          <div className="hero-image">
            <img src="https://via.placeholder.com/500x300" alt="Toy Trends" />
          </div>
        </div>

        {/* Toy Categories */}
        <div className="categories">
          <div className="category-card">
            <img src="https://via.placeholder.com/250" alt="Building Blocks" />
            <div className="category-name">Building Blocks</div>
          </div>
          <div className="category-card">
            <img src="https://via.placeholder.com/250" alt="Action Figures" />
            <div className="category-name">Action Figures</div>
          </div>
          <div className="category-card">
            <img src="https://via.placeholder.com/250" alt="Educational Toys" />
            <div className="category-name">Educational Toys</div>
          </div>
        </div>

        {/* Featured Product Section */}
        <div className="featured-product">
          <div className="product-image">
            <img src="https://via.placeholder.com/500x400" alt="Building Set" />
          </div>
          <div className="product-details">
            <h2>Creative Building Set</h2>
            <p>
              A fun and educational set to help children develop creativity and
              problem-solving skills.
            </p>
            <div className="product-price">$49</div>
            <button className="product-btn">Add to Cart</button>
          </div>
        </div>

        {/* Masonry Grid of Toy Items */}
        <div className="masonry-grid">
          <div className="product-card">
            <img src="https://via.placeholder.com/250" alt="Doll" />
            <div className="product-info">
              <h3>Fashion Doll</h3>
              <p>$29</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/250" alt="Puzzle" />
            <div className="product-info">
              <h3>3D Puzzle</h3>
              <p>$19</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/250" alt="Race Car" />
            <div className="product-info">
              <h3>Race Car Set</h3>
              <p>$79</p>
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
