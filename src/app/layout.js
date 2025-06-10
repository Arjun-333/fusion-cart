"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AuthAndLayoutWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    const publicPaths = ["/login", "/signup", "/password/forgot"];
    const isPublicPath =
      publicPaths.includes(pathname) || pathname.startsWith("/password/reset");

    if (!authLoading) {
      if (!isAuthenticated && !isPublicPath) {
        router.push("/login");
      } else if (isAuthenticated && isPublicPath) {
        router.push("/");
      }
    }
  }, [isAuthenticated, authLoading, router, pathname]);

  if (authLoading) {
    return <div>Loading application...</div>;
  }

  return (
    <>
      {isAuthenticated && <Header />}
      <main>{children}</main>
      {isAuthenticated && <Footer />}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <AuthAndLayoutWrapper>{children}</AuthAndLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
