const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Newsletter Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">
            Sign up for our newsletter
          </h3>
          <p className="text-gray-600 mb-4">
            Be the first to know about our special offers, new product launches,
            and events.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Email Address"
              className="border rounded-l-full py-2 px-4 w-full focus:outline-none"
            />
            <button
              type="submit"
              className="bg-black text-white py-2 px-6 rounded-r-full hover:bg-gray-800"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Shop Links */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold mb-4">Shop</h3>
          <ul className="space-y-2">
            <li>
              <a href="#women" className="text-gray-700 hover:text-black">
                Women's
              </a>
            </li>
            <li>
              <a href="#men" className="text-gray-700 hover:text-black">
                Men's
              </a>
            </li>
            <li>
              <a href="#kids" className="text-gray-700 hover:text-black">
                Kids'
              </a>
            </li>
            <li>
              <a href="#shoes" className="text-gray-700 hover:text-black">
                Shoes
              </a>
            </li>
            <li>
              <a href="#sale" className="text-gray-700 hover:text-black">
                Sale
              </a>
            </li>
          </ul>
        </div>

        {/* Help & About Links */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold mb-4">Help</h3>
          <ul className="space-y-2">
            <li>
              <a href="#contact" className="text-gray-700 hover:text-black">
                Contact Us
              </a>
            </li>
          </ul>

          <h3 className="text-lg font-bold mt-8 mb-4">About</h3>
          <ul className="space-y-2">
            <li>
              <a href="#about" className="text-gray-700 hover:text-black">
                About Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
