"use client";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";

export default function HomePage() {
  const [results, setResults] = useState([]);

  return (
    <div className="min-h-screen bg-amber-50 text-amber-900">
      <h1 className="text-center text-4xl font-bold pt-10">
        Fusion Cart Search
      </h1>
      <SearchBar onResults={setResults} />
      <SearchResults results={results} />
    </div>
  );
}
