// client/src/pages/AddRecipe.jsx

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddRecipe.css';

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    cuisine: '',
    origin: '',
    ingredients: '',
    instructions: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      alert("You must be logged in");
      return;
    }

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('cuisine', formData.cuisine);
      form.append('origin', formData.origin);
      form.append('ingredients', formData.ingredients);
      form.append('instructions', formData.instructions);
      form.append('image', formData.image);

      const res = await axios.post('http://localhost:5000/api/recipes', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`
        }
      });

      if (res.status === 201) {
        alert("Recipe added successfully!");
        window.location.href = '/recipes';
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="addrecipe">
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Recipe Title" onChange={handleChange} required />
        <input type="text" name="cuisine" placeholder="Cuisine Type" onChange={handleChange} required />
        <input type="text" name="origin" placeholder="Place of Origin" onChange={handleChange} required />
        <textarea name="ingredients" placeholder="Ingredients (comma separated)" onChange={handleChange} required />
        <textarea name="instructions" placeholder="Instructions" onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
