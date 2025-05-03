import "./furniture.css"; // Import the external CSS file

export default function Furniture() {
  return (
    <div className="container">
      {/* Header */}
      <header>
        <div className="logo">FusionCart</div>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search Furniture..."
          />
          <span className="search-icon">&#128269;</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-text">
            <h1>Quality Furniture for Your Home</h1>
            <p>
              Explore our range of stylish and durable furniture pieces for
              every room.
            </p>
            <button className="hero-btn">Shop Now</button>
          </div>
          <div className="hero-image">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Furniture Trends"
            />
          </div>
        </div>

        {/* Furniture Categories */}
        <div className="categories">
          <div className="category-card">
            <img src="https://via.placeholder.com/250" alt="Living Room" />
            <div className="category-name">Living Room</div>
          </div>
          <div className="category-card">
            <img src="https://via.placeholder.com/250" alt="Bedroom" />
            <div className="category-name">Bedroom</div>
          </div>
          <div className="category-card">
            <img src="https://via.placeholder.com/250" alt="Office" />
            <div className="category-name">Office</div>
          </div>
        </div>

        {/* Featured Product Section */}
        <div className="featured-product">
          <div className="product-image">
            <img src="https://via.placeholder.com/500x400" alt="Wooden Chair" />
          </div>
          <div className="product-details">
            <h2>Solid Wood Chair</h2>
            <p>
              Comfortable, durable, and stylish. Perfect for your dining room or
              office.
            </p>
            <div className="product-price">$120</div>
            <button className="product-btn">Add to Cart</button>
          </div>
        </div>

        {/* Masonry Grid of Furniture Items */}
        <div className="masonry-grid">
          <div className="product-card">
            <img src="https://via.placeholder.com/250" alt="Sofa" />
            <div className="product-info">
              <h3>Modern Sofa</h3>
              <p>$399</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/250" alt="Bookshelf" />
            <div className="product-info">
              <h3>Wooden Bookshelf</h3>
              <p>$250</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/250" alt="Dining Table" />
            <div className="product-info">
              <h3>Dining Table</h3>
              <p>$499</p>
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
