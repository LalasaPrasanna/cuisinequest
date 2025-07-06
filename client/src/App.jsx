import { useEffect, useState } from 'react';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
  fetch('http://localhost:5000/api/recipes')
    .then(res => res.json())
    .then(data => setRecipes(data))
    .catch((err) => console.error("Error fetching recipes:", err));
}, []);


  return (
    <div style={{ padding: '2rem' }}>
      <h1>🍽️ CuisineQuest</h1>
      <p>World recipes:</p>
      {recipes.map(r => (
        <div key={r._id}>
          <h2>{r.title}</h2>
          <p>{r.cuisine}</p>
          <p>{r.ingredients.join(', ')}</p>
          <p>{r.instructions}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
