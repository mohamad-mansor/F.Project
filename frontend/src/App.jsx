import Footer from "./components/Footer";
import Login from "./components/Login";
import Header from "./components/Header";
import './App.css'
function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        {/* AYHEM Hero Page */}
        <main className="flex-grow"></main>
        <Footer />

        <Login />
      </div>
    </>
  )
}
export default App;

