import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RecipeList from './pages/RecipeList';
import AddRecipe from './pages/AddRecipe';
import './styles/Home.css';
import './styles/Login.css';
import './styles/RecipeList.css';
import './styles/AddRecipe.css';

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => setUser(JSON.parse(localStorage.getItem('user'))), []);
  useEffect(() => { window.addEventListener('beforeunload', () => localStorage.removeItem('user')); }, []);

  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Home </Link>
        <Link to="/add">Add Recipe </Link>
        <Link to="/recipes">Recipe List </Link>
        {!user && <Link to="/login">Login </Link>}
        {user && <button onClick={() => { localStorage.removeItem('user'); setUser(null); }}>Logout</button>}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/recipes" element={user ? <RecipeList /> : <Navigate to="/login" />} />
        <Route path="/add" element={user ? <AddRecipe /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
