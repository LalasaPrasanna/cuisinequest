import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddRecipe from './pages/AddRecipe';
import RecipeList from './pages/RecipeList';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    title: '',
    cuisine: '',
    ingredients: '',
    instructions: '',
    image: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Error:', err));
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
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', padding: '1rem' }}>
      <nav style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <Link to="/" style={{ margin: '0 1rem', color: 'lightblue', textDecoration: 'none' }}>Recipes</Link>
        <Link to="/add" style={{ margin: '0 1rem', color: 'lightblue', textDecoration: 'none' }}>Add Recipe</Link>
      </nav>

      <Routes>
        <Route path="/" element={<RecipeList recipes={recipes} />} />
        <Route path="/add" element={<AddRecipe form={form} handleChange={handleChange} handleSubmit={handleSubmit} />} />
      </Routes>
    </div>
  );
}

export default App;
