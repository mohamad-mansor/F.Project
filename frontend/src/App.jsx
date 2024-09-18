import Shopmen from './components/ShowMen.jsx';
import ShopWomen from './components/ShowWomen.jsx';
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css'

function App() {

  return (
    <>
     <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      <ShopWomen />
      <Shopmen />
      <main className="flex-grow">{/* Your main content goes here */}</main>

      {/* Footer - this will always stay at the bottom */}
      <Footer />
    </div>   
    </>
  )
}

export default App;
