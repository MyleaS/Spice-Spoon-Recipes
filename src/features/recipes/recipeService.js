export function loadRecipes() {
  try {
    const data = localStorage.getItem("spice-recipes");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load recipes", e);
    return [];
  }
}

export function saveRecipes(recipes) {
  try {
    localStorage.setItem("spice-recipes", JSON.stringify(recipes));
  } catch (e) {
    console.error("Failed to save recipes", e);
  }
}

export function createRecipe(fields) {
  return {
    id: crypto.randomUUID(),
    source: "user",
    createdAt: Date.now(),
    ...fields,
  };
}

export function updateRecipe(recipes, id, fields) {
  return recipes.map((r) => (r.id === id ? { ...r, ...fields } : r));
}

export function deleteRecipe(recipes, id) {
  return recipes.filter((r) => r.id !== id);
}
