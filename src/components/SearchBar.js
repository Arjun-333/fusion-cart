"use client";
import { useState } from "react";

export default function SearchBar({ onResults }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const searchText = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const res = await fetch(
      `http://127.0.0.1:5000/search/text?query=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    onResults(data.shopping_results || []);
    setLoading(false);
  };

  const searchImage = async () => {
    if (!imageFile) return;
    const formData = new FormData();
    formData.append("image", imageFile);
    setLoading(true);
    const res = await fetch(`http://127.0.0.1:5000/search/image`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    onResults(data.visual_matches || []);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 my-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="border border-gray-300 p-2 rounded w-full max-w-lg"
        onKeyDown={(e) => e.key === "Enter" && searchText()}
      />
      <div className="flex gap-4">
        <button
          onClick={searchText}
          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
        >
          Search
        </button>
        <label className="cursor-pointer bg-amber-100 text-amber-800 px-4 py-2 rounded border border-amber-300 hover:bg-amber-200">
          Upload Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </label>
        {imageFile && (
          <button
            onClick={searchImage}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Search by Image
          </button>
        )}
      </div>
      {loading && <p className="text-amber-700">Searching...</p>}
    </div>
  );
}
