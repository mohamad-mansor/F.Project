
import './hero.css'; // Importiere die hero.css Datei

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Our latest arrivals</h1>
        <p>
          Create screens directly in Method or add your images from Sketch or Figma.
          You can even sync designs from your cloud storage!
        </p>
        <button className="shop-button">Shop All</button>

        <div className="grid">
          <div className="grid-item">
            <img src="https://i.pinimg.com/736x/e9/95/b3/e995b35050cb2c9216b10166f0afbb24.jpg" alt="Mann" />
          </div>
          <div className="grid-item">
            <img src="https://m.media-amazon.com/images/I/718NbNtJieL._AC_UY580_.jpg" alt="Frau" />
          </div>
          <div className="grid-item">
            <img src="https://cdn.pixabay.com/photo/2024/04/25/09/24/best-frocks-kidswear-8719393_640.jpg" alt="Kinder" />
          </div>
        </div>
      </div>
    </section>
  );
  
};

export default Hero;
