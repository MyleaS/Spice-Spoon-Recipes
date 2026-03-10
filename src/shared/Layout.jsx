import { NavLink } from "react-router-dom";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="app-shell">
      <div className="bg-spoons" aria-hidden="true">
        <span className="bg-spoon bg-spoon--left">🥄</span>
        <span className="bg-spoon bg-spoon--right">🥄</span>
      </div>
      <header className="app-header">
        <div className="brand">🌶️ Spice &amp; Spoon</div>
        <nav className="nav" aria-label="Primary navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/recipes"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Recipes
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Add Recipe
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Favorites
          </NavLink>
          <NavLink
            to="/shopping-list"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            🛒 Shopping List
          </NavLink>
        </nav>
      </header>
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
