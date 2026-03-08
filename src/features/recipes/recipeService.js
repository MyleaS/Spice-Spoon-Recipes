const STORAGE_KEY = "spice_spoon_recipes";

export const loadRecipes = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveRecipes = (recipes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
};
