import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
