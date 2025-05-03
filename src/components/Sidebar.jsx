import React from "react";
import "../styles/sidebar.css"; // Import the sidebar CSS from styles directory

const Sidebar = () => {
  return (
    <aside className="sidebar fixed top-0 left-0 h-full w-64 bg-white shadow-md p-6 flex flex-col">
      <div className="logo mb-8 text-2xl font-bold text-gray-800">
        Fusion Cart
      </div>
      <nav className="flex flex-col space-y-4">
        <a href="/index.html" className="text-gray-700 hover:text-blue-600">
          Home
        </a>
        <a href="/fashion.html" className="text-gray-700 hover:text-blue-600">
          Fashion
        </a>
        <a
          href="/electronics.html"
          className="text-gray-700 hover:text-blue-600"
        >
          Electronics
        </a>
        <a href="/furniture.html" className="text-gray-700 hover:text-blue-600">
          Furniture
        </a>
        <a href="/toys.html" className="text-gray-700 hover:text-blue-600">
          Toys
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
