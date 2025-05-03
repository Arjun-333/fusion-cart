import "./fashion.css"; // Import the external CSS file

export default function Fashion() {
  return (
    <div className="container">
      {/* Header */}
      <header>
        <div className="logo">FusionCart</div>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search Fashion..."
          />
          <span className="search-icon">&#128269;</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-text">
            <h1>Discover the Latest in Fashion</h1>
            <p>
              Browse our curated collection for a touch of style, comfort, and
              elegance.
            </p>
            <button className="hero-btn">Shop Now</button>
          </div>
          <div className="hero-image">
            <img
              src="https://safaaworld.com/cdn/shop/articles/safaa_blog_indian_wear.jpg?v=1714716489"
              alt="Fashion Trends"
            />
          </div>
        </div>

        {/* Fashion Categories */}
        <div className="categories">
          <div className="category-card">
            <img src="https://via.placeholder.com/250" alt="Category 1" />
            <div className="category-name">Category 1</div>
          </div>
          <div className="product-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBK0VWs2u0-bEvSyNlzCEUACja7vyFswky7A&s"
              alt="Designer Sneakers"
            />
            <div className="product-info">
              <h3>Designer Sneakers</h3>
              <p>$199</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
          <div className="product-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmSOcvuwYejobWdE8U2H6x71NP5cf0TmSpmA&s"
              alt="Comfortable Joggers"
            />
            <div className="product-info">
              <h3>Comfortable Joggers</h3>
              <p>$49</p>
              <button className="add-to-cart">Add to Cart</button>
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
    </div>
  );
}
