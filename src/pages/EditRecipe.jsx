import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "../features/recipes/RecipeForm";
import {
  loadRecipes,
  saveRecipes,
  updateRecipe,
} from "../features/recipes/recipeService";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  // useEffect — load the recipe to edit
  useEffect(() => {
    const recipes = loadRecipes();
    const found = recipes.find((r) => r.id === id);
    if (!found) setError("Recipe not found.");
    else setRecipe(found);
  }, [id]);

  function handleSubmit(fields) {
    const recipes = loadRecipes();
    const updated = updateRecipe(recipes, id, fields);
    saveRecipes(updated);
    navigate(`/recipes/${id}`);
  }

  if (error) return <p className="error">{error}</p>;
  if (!recipe) return <p className="loading">Loading recipe...</p>;

  return (
    <div className="page">
      <h1>Edit Recipe</h1>
      <RecipeForm
        onSubmit={handleSubmit}
        initialValues={{
          title: recipe.title,
          category: recipe.category || "",
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        }}
      />
    </div>
  );
}

export default EditRecipe;
