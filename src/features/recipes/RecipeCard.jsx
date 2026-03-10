import { Link } from "react-router-dom";
import StarRating from "../ratings/StarRating";

function RecipeCard({ recipe, isFavorite, rating, onFavorite, onRate, onDelete }) {
  function handleRate(recipeId, star) {
    console.log("handleRate called", recipeId, star);
    onRate(recipeId, star);
  }

  return (
    <div className="card">
      {recipe.image && (
        <img
          src={recipe.image}
          alt={`Dish: ${recipe.title}`}
          className="card__image"
        />
      )}
      <div className="card__body">
        <div className="card__header">
          <h3 className="card__title">
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </h3>
          {recipe.category && (
            <span className="tag">{recipe.category}</span>
          )}
        </div>

        <StarRating recipeId={recipe.id} rating={rating || 0} onRate={handleRate} />

        <div className="card__actions">
          <button
            className={`btn btn--icon ${isFavorite ? "btn--active" : ""}`}
            onClick={() => onFavorite(recipe.id)}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? "❤️ Saved" : "🤍 Save"}
          </button>

          {recipe.source === "user" && (
            <>
              <Link to={`/edit/${recipe.id}`} className="btn btn--secondary">
                ✏️ Edit
              </Link>
              {onDelete && (
                <button
                  className="btn btn--danger"
                  onClick={() => onDelete(recipe.id)}
                  aria-label={`Delete ${recipe.title}`}
                >
                  🗑 Delete
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
