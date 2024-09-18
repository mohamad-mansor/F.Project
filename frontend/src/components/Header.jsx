import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-black text-white flex justify-between items-center py-2 px-4 text-sm">
        <span>EURO</span>
        <span>Support</span>
      </div>

      {/* Main Navigation */}
      <div className="flex justify-between items-center px-4 py-4 border-b bg-gray-50">
        {/* Logo */}
        <div className="text-2xl font-bold">AMPES</div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <a href="#shop" className="text-gray-700 hover:text-black">
            Shop
          </a>
          <a href="#stories" className="text-gray-700 hover:text-black">
            Stories
          </a>
          <a href="#about" className="text-gray-700 hover:text-black">
            About
          </a>
        </nav>

        {/* Search and Icons */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <input
              type="text"
              className="border rounded-full py-1 px-3 text-sm w-full pl-8"
              placeholder="Search"
            />
            <svg
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l3.6-8H6.4M7 13L5.4 6H4M7 13l-1.5 8.5m1.5-8.5h10m-10 0L9.6 4m6.8 9H9.6m4.4 0l1.5 8.5M9.6 4H19m0 0l-1.6 8.5M13 19.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM7 19.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
              />
            </svg>
            <span className="text-gray-700">3</span>
          </div>

          {/* Login */}
          <button className="text-gray-700 hover:text-black">Login</button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex justify-between px-4 py-4">
        <button
          onClick={toggleMenu}
          className="text-gray-700 hover:text-black focus:outline-none"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Navigation Links */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-50 px-4 py-4 space-y-2">
          <a href="#shop" className="block text-gray-700 hover:text-black">
            Shop
          </a>
          <a href="#stories" className="block text-gray-700 hover:text-black">
            Stories
          </a>
          <a href="#about" className="block text-gray-700 hover:text-black">
            About
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
