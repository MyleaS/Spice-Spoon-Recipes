import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink> | <NavLink to="/recipes">Recipes</NavLink>{" "}
      | <NavLink to="/favorites">Favorites</NavLink>
    </nav>
  );
}

export default Navbar;
