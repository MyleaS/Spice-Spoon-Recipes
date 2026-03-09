// import { Routes, Route } from "react-router-dom";
// import Layout from "./shared/Layout";
// import Home from "./pages/Home";
// import Recipes from "./pages/Recipes";
// import AddRecipe from "./pages/AddRecipe";
// import Favorites from "./pages/Favorites";
// import NotFound from "./pages/NotFound";

// function App() {
//   return (
//     <Layout>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/recipes" element={<Recipes />} />
//         <Route path="/add" element={<AddRecipe />} />
//         <Route path="/favorites" element={<Favorites />} />
//         <Route path="*" element={<NotFound />} /> {/* wildcard */}
//       </Routes>
//     </Layout>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import Layout from "./shared/Layout";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import Favorites from "./pages/Favorites";
import ShoppingList from "./pages/ShoppingList";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/edit/:id" element={<EditRecipe />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
