import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, favorites, ratings, onFavorite, onRate, onDelete }) {
  if (recipes.length === 0) {
    return <p className="empty-state">No recipes found.</p>;
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favorites?.includes(recipe.id)}
          rating={ratings?.[recipe.id] || 0}
          onFavorite={onFavorite}
          onRate={onRate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default RecipeList;
