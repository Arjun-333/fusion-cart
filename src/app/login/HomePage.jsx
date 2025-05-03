import React, { useState } from "react";
import "./HomePage.css"; // Ensure your CSS file is properly linked

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setIsLoggedIn(true); // Directly set the user as logged in
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h1>Login to FusionCart</h1>
        <div className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button onClick={handleLogin} className="login-btn">
            Login
          </button>
        </div>
      </div>
    );
  }

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
          <a href="/" className="tab active">
            Home
          </a>
          <a href="/fashion" className="tab">
            Fashion
          </a>
          <a href="/electronics" className="tab">
            Electronics
          </a>
          <a href="/toys" className="tab">
            Toys
          </a>
          <a href="/furniture" className="tab">
            Furniture
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
            <img src="/your-image.jpg" alt="Home Preview" />
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="logout-container">
        <button onClick={() => setIsLoggedIn(false)} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
