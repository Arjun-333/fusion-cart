"use client";
import React from "react";

export default function FashionPage() {
  return (
    <div className="flex min-h-screen bg-[var(--beige-bg)] text-[var(--dark-brown)] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--sidebar-bg)] text-[var(--accent-gold)] flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-[var(--medium-brown)]">
          Fusion-Cart
        </div>
        <nav className="flex-1 p-6 space-y-4">
          <a
            href="/"
            className="block py-2 px-4 rounded hover:bg-[var(--medium-brown)]"
          >
            Home
          </a>
          <a
            href="/electronics"
            className="block py-2 px-4 rounded hover:bg-[var(--medium-brown)]"
          >
            Electronics
          </a>
          <a
            href="/fashion"
            className="block py-2 px-4 rounded bg-[var(--medium-brown)]"
          >
            Fashion
          </a>
          <a
            href="/furniture"
            className="block py-2 px-4 rounded hover:bg-[var(--medium-brown)]"
          >
            Furniture
          </a>
          <a
            href="/toys"
            className="block py-2 px-4 rounded hover:bg-[var(--medium-brown)]"
          >
            Toys
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Fashion Collection</h1>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search Fashion..."
              className="w-full rounded border border-[var(--medium-brown)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--dark-brown)]"
            />
            <span className="absolute right-3 top-2.5 text-[var(--light-brown)]">
              &#128269;
            </span>
          </div>
        </header>

        {/* Tab Bar */}
        <nav className="flex space-x-4 mb-8 border-b border-[var(--medium-brown)]">
          <a
            href="/electronics"
            className="pb-2 border-b-2 border-transparent hover:border-[var(--light-brown)]"
          >
            Electronics
          </a>
          <a
            href="/fashion"
            className="pb-2 border-b-2 border-[var(--dark-brown)] font-semibold text-[var(--dark-brown)]"
          >
            Fashion
          </a>
          <a
            href="/furniture"
            className="pb-2 border-b-2 border-transparent hover:border-[var(--light-brown)]"
          >
            Furniture
          </a>
          <a
            href="/toys"
            className="pb-2 border-b-2 border-transparent hover:border-[var(--light-brown)]"
          >
            Toys
          </a>
        </nav>

        {/* Featured Product Section */}
        <section className="flex flex-col md:flex-row items-center mb-12 bg-[var(--card-bg)] rounded-lg p-6 shadow-md">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-4xl font-extrabold mb-4 text-[var(--accent-gold)]">
              Discover the Latest in Fashion
            </h2>
            <p className="text-[var(--light-brown)] mb-6">
              Browse our curated collection for a touch of style, comfort, and
              elegance.
            </p>
            <button className="bg-[var(--dark-brown)] text-[var(--beige-bg)] px-6 py-3 rounded hover:bg-[var(--medium-brown)]">
              Shop Now
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src="" // <-- Add your image link here
              alt="Fashion Trends"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Product Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Top Picks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product Card 1 */}
            <div className="bg-[var(--shop-card-bg)] text-[var(--beige-bg)] p-4 rounded-lg shadow-md">
              <img
                src="" // <-- Add your image link here
                alt="Product 1"
                className="rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">Summer Dress</h3>
              <p className="text-[var(--light-brown)] mb-4">$49</p>
              <a
                href="https://www.meesho.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--accent-gold)] text-[var(--dark-brown)] px-4 py-2 rounded hover:bg-[var(--light-brown)] inline-block text-center"
              >
                MEESHO
              </a>
            </div>
            {/* Product Card 2 */}
            <div className="bg-[var(--shop-card-bg)] text-[var(--beige-bg)] p-4 rounded-lg shadow-md">
              <img
                src="" // <-- Add your image link here
                alt="Product 2"
                className="rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">Leather Jacket</h3>
              <p className="text-[var(--light-brown)] mb-4">$199</p>
              <a
                href="https://www.myntra.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--accent-gold)] text-[var(--dark-brown)] px-4 py-2 rounded hover:bg-[var(--light-brown)] inline-block text-center"
              >
                MYNTRA
              </a>
            </div>
            {/* Product Card 3 */}
            <div className="bg-[var(--shop-card-bg)] text-[var(--beige-bg)] p-4 rounded-lg shadow-md">
              <img
                src="" // <-- Add your image link here
                alt="Product 3"
                className="rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">Sneakers</h3>
              <p className="text-[var(--light-brown)] mb-4">$89</p>
              <a
                href="https://www.ajio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--accent-gold)] text-[var(--dark-brown)] px-4 py-2 rounded hover:bg-[var(--light-brown)] inline-block text-center"
              >
                AJIO
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
