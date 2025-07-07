import React from 'react';
import '../styles/RecipeList.css';

const getCuisineImage = (cuisine) => {
  const c = cuisine?.toLowerCase();
  if (c?.includes('indian')) return '/images/chana.jpg';
  if (c?.includes('french')) return '/images/ratatouille.jpg';
  if (c?.includes('middle')) return '/images/falafel.jpg';
  if (c?.includes('chinese')) return '/images/mapotofu.jpg';
  if (c?.includes('italian')) return '/images/caponata.jpg';
  if (c?.includes('japanese')) return '/images/miso.jpg';
  return '/images/default.png';
};

function RecipeList({ recipes }) {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h2>🌍 World Recipes</h2>
        {recipes.length === 0 ? (
          <p>No recipes yet.</p>
        ) : (
          recipes.map((r) => (
            <div className="recipe-card" key={r._id}>
              <img
                className="recipe-image"
                src={r.image || getCuisineImage(r.cuisine)}
                alt={r.title}
              />
              <h3>{r.title}</h3>
              <p><strong>Cuisine:</strong> {r.cuisine}</p>
              <p><strong>Ingredients:</strong> {r.ingredients.join(', ')}</p>
              <p><strong>Instructions:</strong> {r.instructions}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecipeList;
