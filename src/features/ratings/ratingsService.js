export function loadRatings() {
  try {
    return JSON.parse(localStorage.getItem("spice-ratings") || "{}");
  } catch {
    return {};
  }
}

export function saveRating(id, rating) {
  try {
    const ratings = loadRatings();
    const updated = { ...ratings, [id]: rating };
    localStorage.setItem("spice-ratings", JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to save rating", e);
    return loadRatings();
  }
}

export function getRating(id) {
  const ratings = loadRatings();
  return ratings[id] || 0;
}
