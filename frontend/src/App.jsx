import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content - flex-grow to push the footer to the bottom */}
      <main className="flex-grow">{/* Your main content goes here */}</main>

      {/* Footer - this will always stay at the bottom */}
      <Footer />
    </div>
  );
};

export default App;
