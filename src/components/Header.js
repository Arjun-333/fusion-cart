// src/app/components/Header.js

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Fusion Cart</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#"
                className="text-white hover:text-yellow-400 visited:text-white"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-yellow-400 visited:text-white"
              >
                Shop
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-yellow-400 visited:text-white"
              >
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
