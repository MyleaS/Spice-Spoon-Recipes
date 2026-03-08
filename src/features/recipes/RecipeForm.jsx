import { useState } from "react";

function RecipeForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [spice, setSpice] = useState("Mild");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim().length < 3) {
      setError("Recipe name must be at least 3 characters.");
      return;
    }

    onSubmit({ name, description, spice });

    setName("");
    setDescription("");
    setSpice("Mild");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Recipe Name</label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="desc">Description</label>
      <textarea
        id="desc"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="spice">Spice Level</label>
      <select
        id="spice"
        value={spice}
        onChange={(e) => setSpice(e.target.value)}
      >
        <option>Mild</option>
        <option>Medium</option>
        <option>Hot</option>
      </select>

      {error && <p className="error">{error}</p>}

      <button type="submit">Save Recipe</button>
    </form>
  );
}

export default RecipeForm;
