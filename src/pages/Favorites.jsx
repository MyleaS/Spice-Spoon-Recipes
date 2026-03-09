import { useState, useEffect, useCallback } from "react";
import { loadFavorites, saveFavorites, toggleFavorite } from "../features/favorites/favoritesService";
import { loadRecipes } from "../features/recipes/recipeService";
import { loadRatings, saveRating } from "../features/ratings/ratingsService";
import RecipeList from "../features/recipes/RecipeList";

function Favorites() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const favIds = loadFavorites();
    const allRecipes = loadRecipes();
    const rats = loadRatings();
    if (!cancelled) {
      setFavorites(favIds);
      setFavoriteRecipes(allRecipes.filter((r) => favIds.includes(r.id)));
      setRatings(rats);
      setLoading(false);
    }
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    document.title = `Spice & Spoon — Favorites (${favorites.length})`;
    return () => { document.title = "Spice & Spoon"; };
  }, [favorites.length]);

  const handleFavorite = useCallback((id) => {
    const updated = toggleFavorite(favorites, id);
    setFavorites(updated);
    saveFavorites(updated);
    setFavoriteRecipes((prev) => prev.filter((r) => updated.includes(r.id)));
  }, [favorites]);

  const handleRate = useCallback((id, rating) => {
    const updated = saveRating(id, rating);
    setRatings(updated);
  }, []);

  if (loading) return <p className="loading">Loading favorites...</p>;

  return (
    <div className="page">
      <h1>My Favorites</h1>
      {favoriteRecipes.length === 0 ? (
        <p className="empty-state">No favorites yet! Save recipes you love ❤️</p>
      ) : (
        <RecipeList
          recipes={favoriteRecipes}
          favorites={favorites}
          ratings={ratings}
          onFavorite={handleFavorite}
          onRate={handleRate}
        />
      )}
    </div>
  );
}

export default Favorites;
