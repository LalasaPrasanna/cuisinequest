import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/RecipeList.css";

export default function RecipeList({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [originFilter, setOriginFilter] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/recipes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecipes(res.data);
      } catch (error) {
        console.error("Failed to fetch recipes", error);
      }
    };

    fetchRecipes();
  }, []);

  const origins = [...new Set(recipes.map((r) => r.origin))];

  const filteredRecipes = originFilter
    ? recipes.filter((r) => r.origin === originFilter)
    : recipes;

  return (
    <div className="recipe-list-container">
      <h2>Recipe List</h2>

      {/* Navigation links FIRST */}
      <div className="recipe-list-links">
        <a href="/add">Add Recipe</a>
        <a href="/">Home</a>
        <a href="/" onClick={() => localStorage.removeItem("token")}>Logout</a>
      </div>

      {/* Filter SECOND */}
      <div className="filter-container">
        <label>Filter by Cuisine: </label>
        <select
          value={originFilter}
          onChange={(e) => setOriginFilter(e.target.value)}
        >
          <option value="">All Cuisines</option>
          {origins.map((origin, index) => (
            <option key={index} value={origin}>
              {origin}
            </option>
          ))}
        </select>
      </div>

      <div className="recipes">
        {filteredRecipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          filteredRecipes.map((recipe, index) => (
            <div className="recipe-card" key={index}>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <h3>{recipe.name}</h3>
              <p><strong>Cuisine:</strong> {recipe.origin}</p>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
