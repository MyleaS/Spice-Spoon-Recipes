// import { useState } from "react";

// function RecipeForm({ onSubmit }) {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [spice, setSpice] = useState("Mild");
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (name.trim().length < 3) {
//       setError("Recipe name must be at least 3 characters.");
//       return;
//     }

//     onSubmit({ name, description, spice });

//     setName("");
//     setDescription("");
//     setSpice("Mild");
//     setError("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="name">Recipe Name</label>
//       <input id="name" value={name} onChange={(e) => setName(e.target.value)} />

//       <label htmlFor="desc">Description</label>
//       <textarea
//         id="desc"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />

//       <label htmlFor="spice">Spice Level</label>
//       <select
//         id="spice"
//         value={spice}
//         onChange={(e) => setSpice(e.target.value)}
//       >
//         <option>Mild</option>
//         <option>Medium</option>
//         <option>Hot</option>
//       </select>

//       {error && <p className="error">{error}</p>}

//       <button type="submit">Save Recipe</button>
//     </form>
//   );
// }

// export default RecipeForm;

import { useState } from "react";

function RecipeForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.ingredients.trim())
      newErrors.ingredients = "Ingredients are required.";
    if (!form.instructions.trim())
      newErrors.instructions = "Instructions are required.";
    return newErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value })); // never mutates state directly
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevents page refresh
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(form);
    setForm({ title: "", ingredients: "", instructions: "" });
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} />
        {errors.title && <p className="error">{errors.title}</p>}{" "}
        {/* conditional render 1 */}
      </div>
      <div>
        <label>Ingredients</label>
        <textarea
          name="ingredients"
          value={form.ingredients}
          onChange={handleChange}
        />
        {errors.ingredients && <p className="error">{errors.ingredients}</p>}{" "}
        {/* conditional render 2 */}
      </div>
      <div>
        <label>Instructions</label>
        <textarea
          name="instructions"
          value={form.instructions}
          onChange={handleChange}
        />
        {errors.instructions && <p className="error">{errors.instructions}</p>}{" "}
        {/* conditional render 3 */}
      </div>
      <button type="submit">Save Recipe</button>
    </form>
  );
}

export default RecipeForm;
