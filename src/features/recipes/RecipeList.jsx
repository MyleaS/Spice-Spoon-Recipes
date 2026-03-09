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

function RecipeList({ recipes, onDelete, onFavorite, favorites }) {
  if (recipes.length === 0) {
    return <p>No recipes found.</p>; // conditional render 6
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id} // unique key from id, NOT index
          recipe={recipe}
          onDelete={onDelete}
          onFavorite={onFavorite}
          isFavorite={favorites?.includes(recipe.id)}
        />
      ))}
    </div>
  );
}

export default RecipeList;
