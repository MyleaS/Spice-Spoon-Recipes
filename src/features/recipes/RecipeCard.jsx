import FavoriteButton from "../favorites/FavoriteButton";

function RecipeCard({ recipe, onDelete }) {
  return (
    <div className="card">
      <h3>{recipe.name}</h3>
      <p>{recipe.description}</p>
      <p>🌶️ Spice Level: {recipe.spice}</p>

      <FavoriteButton recipe={recipe} />

      <button onClick={() => onDelete(recipe.id)}>Delete</button>
    </div>
  );
}

export default RecipeCard;
