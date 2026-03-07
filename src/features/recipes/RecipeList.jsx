function RecipeList() {
  const recipes = ["Pasta", "Tacos", "Soup"];

  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe}>{recipe}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
