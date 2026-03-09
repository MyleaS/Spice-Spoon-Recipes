export function loadShoppingList() {
  try {
    return JSON.parse(localStorage.getItem("spice-shopping") || "[]");
  } catch {
    return [];
  }
}

export function saveShoppingList(list) {
  try {
    localStorage.setItem("spice-shopping", JSON.stringify(list));
  } catch (e) {
    console.error("Failed to save shopping list", e);
  }
}

export function addIngredientsToList(currentList, recipe) {
  const ingredientArray = recipe.ingredients
    .split(",")
    .map((i) => i.trim())
    .filter(Boolean);

  const newItems = ingredientArray
    .filter((ing) => !currentList.some((item) => item.name.toLowerCase() === ing.toLowerCase()))
    .map((ing) => ({
      id: crypto.randomUUID(),
      name: ing,
      checked: false,
      recipeTitle: recipe.title,
    }));

  return [...currentList, ...newItems];
}

export function toggleShoppingItem(list, id) {
  return list.map((item) =>
    item.id === id ? { ...item, checked: !item.checked } : item
  );
}

export function removeShoppingItem(list, id) {
  return list.filter((item) => item.id !== id);
}

export function clearCheckedItems(list) {
  return list.filter((item) => !item.checked);
}
