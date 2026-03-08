// function FavoriteButton() {
//   return <button>Add to Favorites</button>;
// }

// export default FavoriteButton;

import { useState } from "react";

function FavoriteButton({ recipe }) {
  const [saved, setSaved] = useState(false);

  return (
    <button onClick={() => setSaved(!saved)}>
      {saved ? "❤️ Favorited" : "🤍 Favorite"}
    </button>
  );
}

export default FavoriteButton;
