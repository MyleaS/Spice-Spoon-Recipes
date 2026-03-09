import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getMealById, normalizeMeal } from "../features/api/mealdbService";
import { loadRecipes } from "../features/recipes/recipeService";
import {
  loadFavorites,
  saveFavorites,
  toggleFavorite,
} from "../features/favorites/favoritesService";
import { getRating, saveRating } from "../features/ratings/ratingsService";
import {
  loadShoppingList,
  saveShoppingList,
  addIngredientsToList,
} from "../features/shopping/shoppingService";
import StarRating from "../features/ratings/StarRating";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const [addedToList, setAddedToList] = useState(false);

  // useEffect 1 — load recipe from API or localStorage
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    async function fetchRecipe() {
      try {
        let found = null;
        if (id.startsWith("api-")) {
          const apiId = id.replace("api-", "");
          const meal = await getMealById(apiId);
          if (meal) found = normalizeMeal(meal);
        } else {
          const local = loadRecipes();
          found = local.find((r) => r.id === id) || null;
        }
        if (!cancelled) {
          if (!found) setError("Recipe not found.");
          else setRecipe(found);
        }
      } catch {
        if (!cancelled) setError("Failed to load recipe.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRecipe();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // useEffect 2 — load favorites and rating
  useEffect(() => {
    if (!id) return;
    const favs = loadFavorites();
    setIsFavorite(favs.includes(id));
    setRating(getRating(id));
  }, [id]);

  const handleFavorite = useCallback(() => {
    const favs = loadFavorites();
    const updated = toggleFavorite(favs, id);
    saveFavorites(updated);
    setIsFavorite(updated.includes(id));
  }, [id]);

  const handleRate = useCallback((recipeId, value) => {
    saveRating(recipeId, value);
    setRating(value);
  }, []);

  const handleAddToShoppingList = useCallback(() => {
    if (!recipe) return;
    const current = loadShoppingList();
    const updated = addIngredientsToList(current, recipe);
    saveShoppingList(updated);
    setAddedToList(true);
  }, [recipe]);

  if (loading) return <p className="loading">Loading recipe...</p>;
  if (error)
    return (
      <p className="error">
        {error} <Link to="/">Go home</Link>
      </p>
    );
  if (!recipe) return null;

  const ingredientList = recipe.ingredients
    .split(",")
    .map((i) => i.trim())
    .filter(Boolean);

  return (
    <div className="page recipe-detail">
      <Link to="/" className="back-link">
        ← Back
      </Link>

      <div className="recipe-detail__header">
        {recipe.image && (
          <img
            src={recipe.image}
            alt={`Dish: ${recipe.title}`}
            className="recipe-detail__image"
          />
        )}
        <div className="recipe-detail__meta">
          <h1>{recipe.title}</h1>
          {recipe.category && <span className="tag">{recipe.category}</span>}

          <StarRating recipeId={id} rating={rating} onRate={handleRate} />

          <div className="recipe-detail__actions">
            <button
              className={`btn ${isFavorite ? "btn--active" : "btn--secondary"}`}
              onClick={handleFavorite}
            >
              {isFavorite ? "❤️ Saved to Favorites" : "🤍 Save to Favorites"}
            </button>

            <button
              className="btn btn--secondary"
              onClick={handleAddToShoppingList}
              disabled={addedToList}
            >
              {addedToList
                ? "✅ Added to Shopping List"
                : "🛒 Add to Shopping List"}
            </button>

            {recipe.source === "user" && (
              <Link to={`/edit/${recipe.id}`} className="btn btn--secondary">
                ✏️ Edit Recipe
              </Link>
            )}
          </div>
        </div>
      </div>

      <section className="recipe-detail__ingredients">
        <h2>Ingredients</h2>
        <ul>
          {ingredientList.map((ing) => (
            <li key={ing}>{ing}</li>
          ))}
        </ul>
      </section>

      <section className="recipe-detail__instructions">
        <h2>Instructions</h2>
        {recipe.instructions
          .split("\r\n")
          .filter(Boolean)
          .map((step, i) => (
            <p key={i}>{step}</p>
          ))}
      </section>
    </div>
  );
}

export default RecipeDetail;
