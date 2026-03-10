import { useState, useEffect, useCallback } from "react";
import RecipeList from "../features/recipes/RecipeList";
import { loadRecipes, saveRecipes, deleteRecipe } from "../features/recipes/recipeService";
import { loadFavorites, saveFavorites, toggleFavorite } from "../features/favorites/favoritesService";
import { loadRatings, saveRating } from "../features/ratings/ratingsService";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    let cancelled = false;
    try {
      const data = loadRecipes();
      const favs = loadFavorites();
      const rats = loadRatings();
      if (!cancelled) {
        setRecipes(data);
        setFavorites(favs);
        setRatings(rats);
        setLoading(false);
      }
    } catch {
      if (!cancelled) {
        setError("Failed to load recipes.");
        setLoading(false);
      }
    }
    return () => { cancelled = true; };
  }, []);

  // useEffect 2 — re-sync ratings when user navigates back to this page
  useEffect(() => {
    function syncRatings() {
      setRatings(loadRatings());
    }
    window.addEventListener("focus", syncRatings);
    return () => window.removeEventListener("focus", syncRatings);
  }, []);

  useEffect(() => {
    document.title = `Spice & Spoon — My Recipes (${recipes.length})`;
    return () => { document.title = "Spice & Spoon"; };
  }, [recipes.length]);

  const handleDelete = useCallback((id) => {
    const updated = deleteRecipe(recipes, id);
    setRecipes(updated);
    saveRecipes(updated);
  }, [recipes]);

  const handleFavorite = useCallback((id) => {
    const updated = toggleFavorite(favorites, id);
    setFavorites(updated);
    saveFavorites(updated);
  }, [favorites]);

  const handleRate = useCallback((id, rating) => {
    const updated = saveRating(id, rating);
    setRatings(updated);
  }, []);

  const categories = [...new Set(recipes.map((r) => r.category).filter(Boolean))];

  const filtered = recipes.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !filterCategory || r.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <p className="loading">Loading your recipes...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="page">
      <h1>My Recipes</h1>
      <div className="filters">
        <label htmlFor="recipe-search" className="sr-only">Search recipes</label>
        <input
          id="recipe-search"
          type="search"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        {categories.length > 0 && (
          <>
            <label htmlFor="category-filter" className="sr-only">Filter by category</label>
            <select
              id="category-filter"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </>
        )}
      </div>
      {recipes.length === 0 ? (
        <p className="empty-state">You haven't added any recipes yet. <a href="/add">Add one!</a></p>
      ) : filtered.length === 0 ? (
        <p className="empty-state">No recipes match your filters.</p>
      ) : (
        <RecipeList
          recipes={filtered}
          favorites={favorites}
          ratings={ratings}
          onFavorite={handleFavorite}
          onRate={handleRate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default Recipes;
