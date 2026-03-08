// import { useState, useEffect } from "react";
// import RecipeList from "../components/RecipeList";

// function Recipes() {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedRecipes = localStorage.getItem("recipes");

//     if (savedRecipes) {
//       setRecipes(JSON.parse(savedRecipes));
//     } else {
//       setRecipes([
//         { id: 1, title: "Pizza", description: "Cheesy pizza" },
//         { id: 2, title: "Ramen", description: "Japanese noodles" },
//       ]);
//     }

//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("recipes", JSON.stringify(recipes));
//   }, [recipes]);

//   if (loading) {
//     return <p>Loading recipes...</p>;
//   }

//   return (
//     <div>
//       <h2>Recipes</h2>
//       <RecipeList recipes={recipes} />
//     </div>
//   );
// }

// export default Recipes;

import { useState, useEffect, useCallback } from "react";
import RecipeList from "../features/recipes/RecipeList";
import { loadRecipes, saveRecipes } from "../features/recipes/recipeService";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = loadRecipes();
    setRecipes(data);
    setLoading(false);
  }, []);

  const deleteRecipe = useCallback(
    (id) => {
      const updated = recipes.filter((r) => r.id !== id);
      setRecipes(updated);
      saveRecipes(updated);
    },
    [recipes]
  );

  if (loading) return <p>Loading recipes...</p>;

  return (
    <div>
      <h2>All Recipes</h2>
      <RecipeList recipes={recipes} onDelete={deleteRecipe} />
    </div>
  );
}

export default Recipes;
