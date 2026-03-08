// import { useState } from "react";

// function RecipeList() {
//   // Simple array of recipe objects
//   const [recipes, setRecipes] = useState([
//     { id: 1, name: "Pasta" },
//     { id: 2, name: "Tacos" },
//     { id: 3, name: "Soup" },
//   ]);

//   return (
//     <div>
//       <h2>Recipe List</h2>
//       <ul>
//         {recipes.map((recipe) => (
//           <li key={recipe.id}>{recipe.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default RecipeList;

import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, onDelete }) {
  if (!recipes.length) return <p>No recipes yet.</p>;

  return (
    <div>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default RecipeList;
