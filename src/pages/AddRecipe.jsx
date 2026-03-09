import RecipeForm from "../features/recipes/RecipeForm";
import {
  loadRecipes,
  saveRecipes,
  createRecipe,
} from "../features/recipes/recipeService";

function AddRecipe() {
  const handleSubmit = (fields) => {
    const recipes = loadRecipes();
    const newRecipe = createRecipe(fields); // generates crypto UUID
    saveRecipes([...recipes, newRecipe]); // no mutation
  };

  return (
    <div>
      <h2>Add Recipe</h2>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddRecipe;
