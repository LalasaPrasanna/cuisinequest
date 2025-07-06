import { useEffect, useState } from 'react';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    title: '',
    cuisine: '',
    ingredients: '',
    instructions: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Error fetching recipes:', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      ...form,
      ingredients: form.ingredients.split(',').map(i => i.trim())
    };

    const res = await fetch('http://localhost:5000/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe)
    });

    const saved = await res.json();
    setRecipes([...recipes, saved]);
    setForm({ title: '', cuisine: '', ingredients: '', instructions: '' });
  };

return (
  <div style={{
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '2rem',
    padding: '2rem',
    backgroundColor: '#121212',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box',
    overflowX: 'hidden'
  }}>
    {/* Left: Add Recipe Form */}
    <div style={{
      flex: '1',
      maxWidth: '400px',
      padding: '1rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#1f1f1f',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    }}>
      <h2 style={{ textAlign: 'center' }}>Add a Recipe</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="cuisine" placeholder="Cuisine" value={form.cuisine} onChange={handleChange} />
        <textarea name="ingredients" placeholder="Ingredients (comma separated)" value={form.ingredients} onChange={handleChange} required />
        <textarea name="instructions" placeholder="Instructions" value={form.instructions} onChange={handleChange} required />
        <button type="submit">Add Recipe</button>
      </form>
    </div>

    {/* Right: Recipe List */}
    <div style={{ flex: '2', maxWidth: '700px' }}>
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

export default App;
