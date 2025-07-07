import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 🔐 Check if user is already logged in (token exists)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  // 📥 Fetch recipes if logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetch('http://localhost:5000/api/recipes')
        .then(res => res.json())
        .then(data => setRecipes(data))
        .catch(err => console.error('Error:', err));
    }
  }, [isLoggedIn]);

  // 🧠 Handle login success from <Login />
  const handleLogin = (status) => {
    setIsLoggedIn(status);
    if (status) navigate('/recipes');
  };

  // 🧾 Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // 📨 Submit new recipe with JWT token
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const newRecipe = {
      ...form,
      ingredients: form.ingredients.split(',').map(i => i.trim())
    };

    const res = await fetch('http://localhost:5000/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newRecipe)
    });

    const saved = await res.json();
    setRecipes([...recipes, saved]);
    setForm({ title: '', cuisine: '', ingredients: '', instructions: '', image: '' });
    navigate('/recipes');
  };

  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', padding: '1rem' }}>
      <nav style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <Link to="/" style={{ margin: '0 1rem', color: 'lightblue' }}>Home</Link>

        {isLoggedIn ? (
          <>
            <Link to="/recipes" style={{ margin: '0 1rem', color: 'lightblue' }}>Recipes</Link>
            <Link to="/add" style={{ margin: '0 1rem', color: 'lightblue' }}>Add Recipe</Link>
            <button
              style={{ marginLeft: '1rem', color: 'lightblue', background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={() => {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                navigate('/');
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ margin: '0 1rem', color: 'lightblue' }}>Login</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/recipes" element={isLoggedIn ? <RecipeList recipes={recipes} /> : <Home />} />
        <Route path="/add" element={isLoggedIn ? <AddRecipe form={form} handleChange={handleChange} handleSubmit={handleSubmit} /> : <Home />} />
      </Routes>
    </div>
  );
}

export default App;
