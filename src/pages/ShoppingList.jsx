import { useState, useEffect, useCallback } from "react";
import {
  loadShoppingList,
  saveShoppingList,
  toggleShoppingItem,
  removeShoppingItem,
  clearCheckedItems,
} from "../features/shopping/shoppingService";

function ShoppingList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect 1 — load shopping list from localStorage
  useEffect(() => {
    let cancelled = false;
    const data = loadShoppingList();
    if (!cancelled) {
      setList(data);
      setLoading(false);
    }
    return () => {
      cancelled = true;
    };
  }, []);

  // useEffect 2 — update page title
  useEffect(() => {
    const unchecked = list.filter((i) => !i.checked).length;
    document.title = `Spice & Spoon — Shopping List (${unchecked} items)`;
    return () => {
      document.title = "Spice & Spoon";
    };
  }, [list]);

  const handleToggle = useCallback(
    (id) => {
      const updated = toggleShoppingItem(list, id);
      setList(updated);
      saveShoppingList(updated);
    },
    [list]
  );

  const handleRemove = useCallback(
    (id) => {
      const updated = removeShoppingItem(list, id);
      setList(updated);
      saveShoppingList(updated);
    },
    [list]
  );

  const handleClearChecked = useCallback(() => {
    const updated = clearCheckedItems(list);
    setList(updated);
    saveShoppingList(updated);
  }, [list]);

  const hasChecked = list.some((i) => i.checked);
  const grouped = list.reduce((acc, item) => {
    const key = item.recipeTitle || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  if (loading) return <p className="loading">Loading shopping list...</p>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>🛒 Shopping List</h1>
        {hasChecked && (
          <button className="btn btn--secondary" onClick={handleClearChecked}>
            Clear checked items
          </button>
        )}
      </div>

      {list.length === 0 ? (
        <p className="empty-state">
          Your shopping list is empty. Browse recipes and click "Add to Shopping
          List"!
        </p>
      ) : (
        Object.entries(grouped).map(([recipeTitle, items]) => (
          <div key={recipeTitle} className="shopping-group">
            <h3 className="shopping-group__title">{recipeTitle}</h3>
            <ul className="shopping-list">
              {items.map((item) => (
                <li
                  key={item.id}
                  className={`shopping-item ${
                    item.checked ? "shopping-item--checked" : ""
                  }`}
                >
                  <label className="shopping-item__label">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleToggle(item.id)}
                      aria-label={`Mark ${item.name} as ${
                        item.checked ? "unchecked" : "checked"
                      }`}
                    />
                    <span>{item.name}</span>
                  </label>
                  <button
                    className="btn btn--icon"
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default ShoppingList;
