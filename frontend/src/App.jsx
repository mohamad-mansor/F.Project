import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css'

function App() {

  return (
    <>
     <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* AYHEM Hero Page   */}
      <main className="flex-grow">{/* Your main content goes here */}</main>

      {/* Footer - this will always stay at the bottom */}
      <Footer />
    </div>   
    </>
  )
}

export default App;
