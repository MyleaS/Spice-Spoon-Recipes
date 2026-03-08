import { useState } from "react";

function FavoritesList() {
  const [favorites, setFavorites] = useState([
    { id: 1, name: "Pizza" },
    { id: 2, name: "Ramen" },
  ]);

  return (
    <div>
      <h2>Favorite Recipes</h2>
      <ul>
        {favorites.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesList;
