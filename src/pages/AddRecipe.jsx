// import { v4 as uuid } from "uuid";
import RecipeForm from "../features/recipes/RecipeForm";
import { loadRecipes, saveRecipes } from "../features/recipes/recipeService";

function AddRecipe() {
  const handleSubmit = (recipe) => {
    const recipes = loadRecipes();

    const newRecipe = {
      //   id: uuid(),
      ...recipe,
    };

    saveRecipes([...recipes, newRecipe]);
  };

  return (
    <div>
      <h2>Add Recipe</h2>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddRecipe;
