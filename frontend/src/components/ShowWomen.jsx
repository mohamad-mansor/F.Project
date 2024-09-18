import '../components/ShowWomen.css';

const ShopWomen = () => {
  return (
    <div className="shop-container">
      <div className="header">
        <h1>Shop Women</h1>
        <p>
          Revamp your style with the latest designer trends in Women's clothing or achieve a
          perfectly curated wardrobe thanks to our line-up of timeless pieces.
        </p>
      </div>

      <div className="shop-content">
        <div className="filters">
          <h2>Filters</h2>
          <button className="clear-filters">Clear filters</button>
          <h3>Categories</h3>
          <div className="categories">
            <label>
              <input type="checkbox" /> Jackets
            </label>
            <label>
              <input type="checkbox" /> Fleece
            </label>
            <label>
              <input type="checkbox" /> Sweatshirts & Hoodies
            </label>
            <label>
              <input type="checkbox" /> Sweaters
            </label>
            <label>
              <input type="checkbox" /> Shirts
            </label>
            <label>
              <input type="checkbox" /> T-shirts
            </label>
            <label>
              <input type="checkbox" /> Pants & Jeans
            </label>
          </div>
          <h3>Color</h3>
          <div className="color-filter">
            <span className="color orange"></span>
            <span className="color green"></span>
            <span className="color blue"></span>
            <span className="color purple"></span>
            <span className="color red"></span>
            <span className="color teal"></span>
            <span className="color gray"></span>
          </div>
        </div>
        <div className="products">
          <div className="sort-section">
            <div className="buttons">
              <button>Sweaters</button>
              <button>Tops</button>
              <button>Jackets</button>
              <button>Hats</button>
            </div>
            <div>
              <select>
                <option>Popular</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="product-card">
                <div className="product-image"></div>
                <div className="product-info">
                  <p className="product-name">Women's Winter Jacket</p>
                  <p className="product-price">€75</p>
                  <p className="product-size">M</p>
                </div>
              </div>
            ))}
          </div>

          <div className="product-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="product-card">
                <div className="product-image"></div>
                <div className="product-info">
                  <p className="product-name">Women's Shirts</p>
                  <p className="product-price">€12</p>
                  <p className="product-size">M</p>
                </div>
              </div>
            ))}
          </div>

          <div className="load-more">
            <button>Load more products</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopWomen;
