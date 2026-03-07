import { Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h2>Welcome to Spice Spoon Recipes 🍲</h2>;
}

function Recipes() {
  return <h2>Here are your recipes!</h2>;
}

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/recipes">Recipes</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </>
  );
}

export default App;
