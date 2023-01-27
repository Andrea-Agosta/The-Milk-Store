import { Footer } from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Product from "./Pages/Product";

function App() {
  return (
    <>
      <Header />
      <div className="bg-[#ffe3e1] min-h-screen">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/milk/:id" element={<Product />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
