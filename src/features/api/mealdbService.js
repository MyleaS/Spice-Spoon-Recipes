const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function searchMeals(query) {
  const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to search recipes");
  const data = await res.json();
  return data.meals || [];
}

export async function getMealById(id) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  if (!res.ok) throw new Error("Failed to fetch recipe");
  const data = await res.json();
  return data.meals?.[0] || null;
}

export async function filterByCategory(category) {
  const res = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error("Failed to filter by category");
  const data = await res.json();
  return data.meals || [];
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories.php`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.categories || [];
}

export async function getRandomMeal() {
  const res = await fetch(`${BASE_URL}/random.php`);
  if (!res.ok) throw new Error("Failed to fetch random recipe");
  const data = await res.json();
  return data.meals?.[0] || null;
}

export function normalizeMeal(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure ? measure.trim() + " " : ""}${ingredient.trim()}`);
    }
  }
  return {
    id: `api-${meal.idMeal}`,
    apiId: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    instructions: meal.strInstructions,
    ingredients: ingredients.join(", "),
    image: meal.strMealThumb + "/preview",  // optimized thumbnail ~220x220
    source: "api",
  };
}
