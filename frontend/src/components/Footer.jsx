import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Decorative element */}
      <div className="footer-bg-pattern"></div>

      <div className="footer-grid">
        {/* Shop Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Shop</h3>
          <ul className="footer-links">
            <li>
              <a href="#women" className="footer-link">
                <span className="footer-icon">👗</span> Women's
              </a>
            </li>
            <li>
              <a href="#men" className="footer-link">
                <span className="footer-icon">👔</span> Men's
              </a>
            </li>
            <li>
              <a href="#kids" className="footer-link">
                <span className="footer-icon">🧸</span> Kids'
              </a>
            </li>
            <li>
              <a href="#shoes" className="footer-link">
                <span className="footer-icon">👟</span> Shoes
              </a>
            </li>
            <li>
              <a href="#sale" className="footer-link">
                <span className="footer-icon">💸</span> Sale
              </a>
            </li>
          </ul>
        </div>
        {/* Help Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Help</h3>
          <ul className="footer-links">
            <li>
              <a href="#contact" className="footer-link">
                <FaPhoneAlt className="footer-icon" /> Contact Us
              </a>
            </li>
            <li>
              <a href="#faqs" className="footer-link">
                <FaEnvelope className="footer-icon" /> FAQs
              </a>
            </li>
          </ul>
        </div>
        {/* About Links */}
        <div className="footer-section">
          <h3 className="footer-heading">About</h3>
          <ul className="footer-links">
            <li>
              <a href="#about" className="footer-link">
                <FaMapMarkerAlt className="footer-icon" /> About Us
              </a>
            </li>
            <li>
              <a href="#careers" className="footer-link">
                🌟 Careers
              </a>
            </li>
          </ul>

          <h3 className="footer-heading">Follow Us</h3>
          <div className="footer-social-links">
            <a href="#instagram" className="footer-social-link">
              <FaInstagram size={20} />
            </a>
            <a href="#twitter" className="footer-social-link">
              <FaTwitter size={20} />
            </a>
            <a href="#facebook" className="footer-social-link">
              <FaFacebookF size={20} />
            </a>
          </div>
        </div>
        {/* Newsletter Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Newsletter</h3>
          <p className="footer-description">
            Subscribe to our newsletter to get updates on new products, offers,
            and events.
          </p>
          <form className="footer-form">
            <input
              type="email"
              placeholder="Email Address"
              className="footer-input"
            />
            <button type="submit" className="footer-button">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
