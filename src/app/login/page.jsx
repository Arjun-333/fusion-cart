"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    router.push("/index.html"); // Redirect to the static index.html after login
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden px-4">
      {/* Background Lights & Gradients */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#111] via-[#1a1a1a] to-black opacity-90 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] bg-[#8e6e49] blur-3xl opacity-20 rounded-full top-[-100px] left-[-150px] z-0"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-[#c7a17a] blur-2xl opacity-10 rounded-full bottom-[-100px] right-[-100px] z-0"
        animate={{ scale: [1, 1.4, 1], rotate: [0, 60, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      {/* Login Box */}
      <motion.div
        className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-10 w-full max-w-md z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-[#e4cdb4] tracking-wide">
          Step Into the Experience
        </h1>

        <form onSubmit={handleLogin}>
          {/* Username Field */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-[#e4cdb4]">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-[#1f1f1f] text-white border border-[#3a3a3a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7a17a]"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-[#e4cdb4]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#1f1f1f] text-white border border-[#3a3a3a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7a17a]"
              required
            />
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#c7a17a] text-black py-2 rounded-lg font-semibold transition"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
}
