"use client"; // Keep this directive at the top

import React, { createContext, useState, useContext, useEffect } from "react"; // Import useEffect

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // <-- NEW: State to indicate if auth status is being loaded

  useEffect(() => {
    // This effect runs once on component mount to check initial authentication status
    const checkAuthStatus = async () => {
      // Only run on client
      if (typeof window !== "undefined") {
        try {
          const token = localStorage.getItem("token"); // <-- NEW: Check localStorage for your authentication token
          setIsAuthenticated(!!token && token !== "undefined" && token !== ""); // <-- UPDATED: Enhanced token validation
        } catch (error) {
          console.error("Error checking authentication status:", error);
          setIsAuthenticated(false);
        } finally {
          setLoading(false); // <-- NEW: Authentication status has been determined (loading is complete)
        }
      }
    };

    checkAuthStatus();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const login = (token = "dummy-token") => {
    // <-- NEW: Add token parameter to login
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token); // Store token on login
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token"); // Remove token on logout
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {" "}
      {/* <-- NEW: Pass 'loading' in value */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
