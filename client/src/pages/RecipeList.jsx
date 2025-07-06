import React from 'react';

// ✅ Smart cuisine-to-image mapping
const getCuisineImage = (cuisine) => {
  if (!cuisine) return "/images/default.png";

  const cleanCuisine = cuisine.trim().toLowerCase();

  if (cleanCuisine.includes("indian")) return "/images/chana.jpg";
  if (cleanCuisine.includes("french")) return "/images/ratatouille.jpg";
  if (cleanCuisine.includes("middle")) return "/images/falafel.jpg";
  if (cleanCuisine.includes("chinese")) return "/images/mapotofu.jpg";
  if (cleanCuisine.includes("italian")) return "/images/caponata.jpg";
  if (cleanCuisine.includes("japanese")) return "/images/miso.jpg";

  return "/images/default.png";
};

function RecipeList({ recipes }) {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: '#121212',
        color: 'white',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '90%',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <h2 style={{ textAlign: 'left', marginBottom: '1.5rem' }}>🌍 World Recipes</h2>

        {recipes.length === 0 ? (
          <p>No recipes yet.</p>
        ) : (
          recipes.map((r) => (
            <div
              key={r._id}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                marginBottom: '1.5rem',
                backgroundColor: '#1f1f1f',
                borderRadius: '6px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
            >
              <img
                src={r.image || getCuisineImage(r.cuisine)}
                alt={r.title}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  maxHeight: '400px',
                  objectFit: 'contain',
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  backgroundColor: '#fff',
                }}
              />
              <h3 style={{ marginBottom: '0.5rem' }}>{r.title}</h3>
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
