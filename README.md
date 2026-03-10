<!-- Title: Spice Spoon Recipes

Description: A React application for browsing and saving cooking recipes.
Built with Vite and React Router.

Dependencies
react-router-dom – used for client-side routing

Installation: npm install
Run project: npm run dev

Api Setup: Create a .env.local file with:

VITE_API_URL=
VITE_API_KEY= -->

cat > README.md << 'EOF'

# 🌶 Spice & Spoon

A personal recipe management app built with React. Search thousands of recipes
from TheMealDB, save your favorites, create your own recipes, rate them,
and build shopping lists from ingredients.

## Features

- Search recipes via TheMealDB API
- Create, edit, and delete your own recipes
- Save favorites and rate recipes (1-5 stars)
- Build a shopping list from recipe ingredients
- Filter recipes by category

## Dependencies

- `react-router-dom` — client-side routing
- No libraries directly manipulate the DOM

## API

- TheMealDB: https://www.themealdb.com/api.php
- Free, no API key required, anonymous access

## Installation & Running

1. Clone the repo
2. Install dependencies:
   npm install
3. Start the development server:
   npm run dev
4. Open http://localhost:5173

## Environment Variables

No environment variables are required. See `.env.local.example` for reference.

## Data Persistence

User recipes, favorites, ratings, and shopping lists are saved to localStorage.
No backend or database setup required.
EOF
