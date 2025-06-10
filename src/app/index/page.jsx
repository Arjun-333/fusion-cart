"use client";
import React, { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    // Sidebar navigation
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        navItems.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
      });
    });

    // Tab bar
    const tabItems = document.querySelectorAll(".tab");
    tabItems.forEach((tab) => {
      tab.addEventListener("click", function () {
        tabItems.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
      });
    });

    // Shop cards hover effect
    const shopCards = document.querySelectorAll(".shop-card");
    shopCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px)";
        this.style.transition = "transform 0.3s";
      });
      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
      });
    });
  }, []);

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">FusionCart</div>
        <ul className="nav-list">
          <li className="nav-item active">Home</li>
          <li className="nav-item">Cart</li>
          <li className="nav-item">Orders</li>
          <li className="nav-item">Help</li>
          <li className="nav-item">Settings</li>
        </ul>
        <div className="nav-section">Tools</div>
        <ul className="nav-list">
          <li className="nav-item">Payment</li>
          <li className="nav-item">Account</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="website-name">FusionCart</div>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
            />
            <span className="search-icon">🔍</span>
          </div>
          <div className="controls">
            <div className="control-btn">C</div>
            <div className="control-btn">+</div>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="tab-bar">
          <a href="#" className="tab active">
            Home
          </a>
          <a href="#" className="tab">
            Electronics
          </a>
          <a href="#" className="tab">
            Fashion
          </a>
          <a href="#" className="tab">
            Furniture
          </a>
          <a href="#" className="tab">
            Toys
          </a>
        </div>

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Home</h1>
            <p className="hero-subtitle">
              Recommendations based on your shopping history and product
              interests
            </p>
            <button className="hero-btn">Show more</button>
          </div>
          <div className="hero-image">
            {/* Home decor preview image */}
            <img
              src="" // <-- Fill in your image link
              alt="Home decor preview"
            />
          </div>
        </div>

        {/* Categories Section */}
        <div className="categories-section">
          <div className="section-title">
            <h2 className="section-heading">Seasonal Picks</h2>
            <span className="view-all">View all</span>
          </div>
          <div className="categories">
            <div className="category-card">
              <div className="category-img">
                <img
                  src="" // <-- Fill in your image link
                  alt="Autumn Decor"
                />
              </div>
              <div className="category-name">Autumn Decor</div>
            </div>
            <div className="category-card">
              <div className="category-img">
                <img
                  src="" // <-- Fill in your image link
                  alt="Candles"
                />
              </div>
              <div className="category-name">Candles</div>
            </div>
            <div className="category-card">
              <div className="category-img">
                <img
                  src="" // <-- Fill in your image link
                  alt="Throws"
                />
              </div>
              <div className="category-name">Throws</div>
            </div>
            <div className="category-card">
              <div className="category-img">
                <img
                  src="" // <-- Fill in your image link
                  alt="Planters"
                />
              </div>
              <div className="category-name">Planters</div>
            </div>
          </div>
        </div>

        {/* Shop Section */}
        <div className="shop-section">
          <div className="section-title">
            <h2 className="section-heading">Shop</h2>
            <span className="view-all">View all</span>
          </div>
          <div className="shop-grid">
            <div className="shop-card">
              <div className="shop-card-img">
                <img
                  src="" // <-- Fill in your image link
                  alt="Ceramic Vase"
                />
              </div>
              <div className="shop-card-title">Ceramic Vase</div>
              <div className="shop-card-price">$49.99</div>
              <button className="shop-card-btn">Buy Now</button>
            </div>
            <div className="shop-card">
              <div className="shop-card-img">
                <img
                  src="" // <-- Fill in your image link
                  alt="Payment Plan"
                />
              </div>
              <div className="shop-card-title">Payment Plan</div>
              <div className="shop-card-price">$19.99/mo</div>
              <button className="shop-card-btn">Subscribe</button>
            </div>
            <div className="shop-card">
              <div className="shop-card-img">
                <img
                  src="" // <-- Fill in your image link
                  alt="Wall Art"
                />
              </div>
              <div className="shop-card-title">Wall Art</div>
              <div className="shop-card-price">$39.99</div>
              <button className="shop-card-btn">Buy Now</button>
            </div>
            <div className="shop-card">
              <div className="shop-card-img">
                <img
                  src="" // <-- Fill in your image link
                  alt="Table Lamp"
                />
              </div>
              <div className="shop-card-title">Table Lamp</div>
              <div className="shop-card-price">$59.99</div>
              <button className="shop-card-btn">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Deals Section */}
        <div className="deals-section">
          <div className="section-title">
            <h2 className="section-heading">Deals</h2>
            <span className="view-all">View all</span>
          </div>
          <div className="shop-grid">
            <div className="shop-card">
              <div className="shop-card-img">
                <img
                  src="" // <-- Fill in your image link
                  alt="Throw Pillows"
                />
              </div>
              <div className="shop-card-title">Throw Pillows</div>
              <div className="shop-card-price">$24.99</div>
              <button className="shop-card-btn">Buy Now</button>
            </div>
            <div className="shop-card">
              <div className="shop-card-img">
                <img
                  src="" // <-- Fill in your image link
                  alt="Wall Clock"
                />
              </div>
              <div className="shop-card-title">Wall Clock</div>
              <div className="shop-card-price">$29.99</div>
              <button className="shop-card-btn">Buy Now</button>
            </div>
          </div>
        </div>

        {/* AI Recommendations Section */}
        <div className="ai-recommendations">
          <div className="section-title">
            <h2 className="section-heading">AI Recommendations</h2>
            <span className="view-all">View all</span>
          </div>
          <div className="shop-grid">
            <div className="shop-card">
              <div className="shop-card-img">
                <img
                  src="" // <-- Fill in your image link
                  alt="Coffee Table"
                />
              </div>
              <div className="shop-card-title">Coffee Table</div>
              <div className="shop-card-price">$129.99</div>
              <button className="shop-card-btn">Buy Now</button>
            </div>
            <div className="shop-card">
              <div className="shop-card-img">
                <img
                  src="" // <-- Fill in your image link
                  alt="Floor Lamp"
                />
              </div>
              <div className="shop-card-title">Floor Lamp</div>
              <div className="shop-card-price">$89.99</div>
              <button className="shop-card-btn">Buy Now</button>
            </div>
            <div className="shop-card">
              <div className="shop-card-img">
                <img
                  src="" // <-- Fill in your image link
                  alt="Bookshelf"
                />
              </div>
              <div className="shop-card-title">Bookshelf</div>
              <div className="shop-card-price">$149.99</div>
              <button className="shop-card-btn">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Search Dots */}
        <div
          className="search-dots"
          style={{ position: "absolute", top: 60, right: 20 }}
        >
          <div className="dot active"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
      {/* You should move the CSS to a separate file in production */}
      <style jsx>{`
        /* ...PASTE YOUR CSS HERE... */
      `}</style>
    </div>
  );
}
