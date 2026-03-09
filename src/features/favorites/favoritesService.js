export function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem("spice-favorites") || "[]");
  } catch {
    return [];
  }
}

export function saveFavorites(favorites) {
  try {
    localStorage.setItem("spice-favorites", JSON.stringify(favorites));
  } catch (e) {
    console.error("Failed to save favorites", e);
  }
}

export function toggleFavorite(favorites, id) {
  return favorites.includes(id)
    ? favorites.filter((f) => f !== id)
    : [...favorites, id];
}
