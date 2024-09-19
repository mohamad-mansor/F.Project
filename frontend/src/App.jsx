import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from './components/hero';
import './App.css'

function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        {/* AYHEM Hero Page */}
        <main className="flex-grow"></main>
        <Hero />
        <Footer />
      </div>   
    </>
  )
}

export default App;
