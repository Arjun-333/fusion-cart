// app/page.js
"use client";

import React from "react";

export default function Page() {
  return (
    <div
      id="app-root"
      className="min-h-screen bg-[var(--beige-bg)] text-[var(--dark-brown)] font-sans"
    >
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">FusionCart</h1>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded border border-[var(--medium-brown)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--dark-brown)]"
            />
            <span className="absolute right-3 top-2.5 text-[var(--light-brown)]">
              🔍
            </span>
          </div>
        </header>

        {/* Tab Bar */}
        <nav className="flex space-x-4 mb-8 border-b border-[var(--medium-brown)]">
          <a
            href="/"
            className="pb-2 border-b-2 border-[var(--accent-gold)] font-semibold"
          >
            Home
          </a>
          <a
            href="/electronics"
            className="pb-2 border-b-2 border-transparent hover:border-[var(--accent-gold)]"
          >
            Electronics
          </a>
          <a
            href="/fashion"
            className="pb-2 border-b-2 border-transparent hover:border-[var(--accent-gold)]"
          >
            Fashion
          </a>
          <a
            href="/furniture"
            className="pb-2 border-b-2 border-transparent hover:border-[var(--accent-gold)]"
          >
            Furniture
          </a>
          <a
            href="/toys"
            className="pb-2 border-b-2 border-transparent hover:border-[var(--accent-gold)]"
          >
            Toys
          </a>
        </nav>
      </main>
    </div>
  );
}
