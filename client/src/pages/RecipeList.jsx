import React from 'react';

function RecipeList({ recipes }) {
  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: '#121212',
      color: 'white',
      boxSizing: 'border-box'
    }}>
      <div style={{ width: '100%', maxWidth: '700px' }}>
        <h2>🌍 World Recipes</h2>
        {recipes.length === 0 ? (
          <p>No recipes yet.</p>
        ) : (
          recipes.map((r) => (
            <div key={r._id} style={{
              border: '1px solid #ccc',
              padding: '1rem',
              marginBottom: '1rem',
              backgroundColor: '#1f1f1f',
              borderRadius: '6px'
            }}>
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
