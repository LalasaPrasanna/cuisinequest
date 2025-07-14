import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AddRecipe.css";

export default function AddRecipe() {
  const [formData, setFormData] = useState({
    name: "",
    origin: "",
    ingredients: "",
    instructions: "",
    image: null
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = e => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post("/api/recipes", data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Recipe added!");
      navigate("/recipes");
    } catch (err) {
      alert("Failed to add recipe. " + (err.response?.data?.message || ""));
    }
  };

  return (
    <div className="add-recipe-container">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipe List</Link>
      </div>
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="origin" placeholder="Cuisine" onChange={handleChange} required />
        <textarea name="ingredients" placeholder="Ingredients" onChange={handleChange} required />
        <textarea name="instructions" placeholder="Instructions" onChange={handleChange} required />
        <input type="file" name="image" onChange={handleImage} required />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}
