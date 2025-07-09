import React from 'react';
import '../styles/RecipeList.css';

const getCuisineImage = (cuisine) => {
  const clean = cuisine?.toLowerCase();
  if (clean?.includes("indian")) return "/images/chana.jpg";
  if (clean?.includes("french")) return "/images/ratatouille.jpg";
  if (clean?.includes("chinese")) return "/images/mapotofu.jpg";
  if (clean?.includes("italian")) return "/images/caponata.jpg";
  if (clean?.includes("japanese")) return "/images/miso.jpg";
  if (clean?.includes("mexican")) return "/images/tacos.jpg";
  if (clean?.includes("middle eastern")) return "/images/falafel.jpg";
  return "/images/default.png";
};

function RecipeList({ recipes }) {
  return (
    <div className="recipe-list-background">
      <div className="recipe-list-container">
        <div className="recipe-grid">
          {recipes.length === 0 ? (
            <p>No recipes yet.</p>
          ) : (
            recipes.map((r) => (
              <div className="recipe-card" key={r._id}>
                <img src={r.image || getCuisineImage(r.cuisine)} alt={r.title} />
                <h3>{r.title}</h3>
                <p><strong>Cuisine:</strong> {r.cuisine}</p>
                <p><strong>Ingredients:</strong> {r.ingredients.join(', ')}</p>
                <p><strong>Instructions:</strong> {r.instructions}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeList;
