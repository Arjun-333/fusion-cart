// login/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) {
    router.push("/"); // Redirect to homepage if already authenticated
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (username === "admin" && password === "password") {
        login("dummy-token"); // Set the user in AuthContext
        router.push("/index"); // Redirect to /index after successful login
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (err) {
      setError(err.message); // Set error message
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white px-4 overflow-hidden">
      {/* Background Animations */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#111] via-[#1a1a1a] to-black opacity-90 z-0" />
      <div className="absolute w-[400px] h-[400px] bg-[#8e6e49] blur-3xl opacity-20 rounded-full top-[-100px] left-[-150px] z-0" />
      <div className="absolute w-[300px] h-[300px] bg-[#c7a17a] blur-2xl opacity-10 rounded-full bottom-[-100px] right-[-100px] z-0" />

      {/* Login Box */}
      <div className="relative w-full max-w-sm p-6 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/5 z-10 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-[#e4cdb4]">
          Step Into the Experience
        </h1>

        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username Field */}
          <div>
            <label className="block mb-1 text-sm text-[#e4cdb4]">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/10 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7a17a]"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 text-sm text-[#e4cdb4]">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 bg-white/10 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7a17a]"
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#c7a17a] text-black py-2.5 rounded-md text-sm font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
