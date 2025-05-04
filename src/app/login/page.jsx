"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    router.push("/index.html");
  };

  return (
    <main className="block md:hidden relative min-h-screen flex items-center justify-center bg-black text-white px-4 overflow-hidden">
      {/* Background Animations */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#111] via-[#1a1a1a] to-black opacity-90 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-[#8e6e49] blur-3xl opacity-20 rounded-full top-[-100px] left-[-150px] z-0"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] bg-[#c7a17a] blur-2xl opacity-10 rounded-full bottom-[-100px] right-[-100px] z-0"
        animate={{ scale: [1, 1.4, 1], rotate: [0, 60, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      {/* Login Box */}
      <motion.div
        className="relative w-full max-w-sm p-6 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/5 z-10 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl font-semibold text-center text-[#e4cdb4]">
          Step Into the Experience
        </h1>

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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 bg-white/10 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7a17a]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-[#c7a17a] hover:text-white"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-[#c7a17a] text-black py-2.5 rounded-md text-sm font-medium"
          >
            Login
          </motion.button>

          {/* Options */}
          <div className="flex items-center justify-between text-xs text-[#e4cdb4]">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-[#c7a17a]" />
              <span>Remember Me</span>
            </label>
            <a href="#" className="text-[#c7a17a] hover:underline">
              Forgot Password?
            </a>
          </div>

          <div className="text-center text-xs text-[#e4cdb4] mt-4">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-[#c7a17a] font-medium hover:underline"
            >
              Sign Up
            </a>
          </div>
        </form>
      </motion.div>
    </main>
  );
}
