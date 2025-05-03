import React from "react";

const TabBar = () => {
  return (
    <div className="tab-bar fixed bottom-0 left-64 right-0 bg-yellow-900 border-t border-yellow-800 flex justify-around py-3">
      <a href="/" className="text-beige-100 hover:text-yellow-300">
        Home
      </a>
      <a href="/fashion" className="text-beige-100 hover:text-yellow-300">
        Fashion
      </a>
      <a href="/electronics" className="text-beige-100 hover:text-yellow-300">
        Electronics
      </a>
      <a href="/furniture" className="text-beige-100 hover:text-yellow-300">
        Furniture
      </a>
      <a href="/toys" className="text-beige-100 hover:text-yellow-300">
        Toys
      </a>
    </div>
  );
};

export default TabBar;
