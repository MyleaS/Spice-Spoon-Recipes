function FavoritesList() {
  const favorites = ["Pizza", "Ramen"];

  return (
    <div>
      <h2>Favorite Recipes</h2>
      <ul>
        {favorites.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesList;
