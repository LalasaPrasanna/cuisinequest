import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddRecipe from "./pages/AddRecipe";
import RecipeList from "./pages/RecipeList";

export default function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    return token && userData ? JSON.parse(userData) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/recipes" element={<RecipeList />} />
      </Routes>
    </Router>
  );
}
