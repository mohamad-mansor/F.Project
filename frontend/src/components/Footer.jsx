import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 px-4 relative">
      {/* Decorative element */}
      <div
        className="absolute inset-0 bg-opacity-10 bg-gray-100"
        style={{ backgroundImage: "url(/path-to-pattern.png)" }}
      ></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 z-10">
        {" "}
        {/* 4-column grid */}
        {/* Shop Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#women"
                className="text-gray-700 hover:text-black flex items-center"
              >
                <span className="mr-2">👗</span> Women's
              </a>
            </li>
            <li>
              <a
                href="#men"
                className="text-gray-700 hover:text-black flex items-center"
              >
                <span className="mr-2">👔</span> Men's
              </a>
            </li>
            <li>
              <a
                href="#kids"
                className="text-gray-700 hover:text-black flex items-center"
              >
                <span className="mr-2">🧸</span> Kids'
              </a>
            </li>
            <li>
              <a
                href="#shoes"
                className="text-gray-700 hover:text-black flex items-center"
              >
                <span className="mr-2">👟</span> Shoes
              </a>
            </li>
            <li>
              <a
                href="#sale"
                className="text-gray-700 hover:text-black flex items-center"
              >
                <span className="mr-2">💸</span> Sale
              </a>
            </li>
          </ul>
        </div>
        {/* Help Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Help</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#contact"
                className="text-gray-700 hover:text-black flex items-center"
              >
                <FaPhoneAlt className="mr-2" /> Contact Us
              </a>
            </li>
            <li>
              <a
                href="#faqs"
                className="text-gray-700 hover:text-black flex items-center"
              >
                <FaEnvelope className="mr-2" /> FAQs
              </a>
            </li>
          </ul>
        </div>
        {/* About Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">About</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#about"
                className="text-gray-700 hover:text-black flex items-center"
              >
                <FaMapMarkerAlt className="mr-2" /> About Us
              </a>
            </li>
            <li>
              <a
                href="#careers"
                className="text-gray-700 hover:text-black flex items-center"
              >
                🌟 Careers
              </a>
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6">Follow Us</h3>
          <div className="flex space-x-4 text-gray-700">
            <a href="#instagram" className="hover:text-black">
              <FaInstagram size={20} />
            </a>
            <a href="#twitter" className="hover:text-black">
              <FaTwitter size={20} />
            </a>
            <a href="#facebook" className="hover:text-black">
              <FaFacebookF size={20} />
            </a>
          </div>
        </div>
        {/* Newsletter Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Newsletter</h3>
          <p className="text-gray-600 text-sm">
            Subscribe to our newsletter to get updates on new products, offers,
            and events.
          </p>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 rounded-full py-2 px-4 text-sm w-full focus:outline-none focus:border-gray-500"
            />
            <button
              type="submit"
              className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800 text-sm w-full"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
