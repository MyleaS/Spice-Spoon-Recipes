// src/App.jsx
import { Routes, Route } from "react-router-dom";

// Shared components
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

// Page components
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <>
      {/* Site-wide Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>

      {/* Site-wide Footer */}
      <Footer />
    </>
  );
}

export default App;
