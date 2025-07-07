import React from 'react';
import '../styles/AddRecipe.css';

function AddRecipe({ form, handleChange, handleSubmit }) {
  return (
    <div className="add-page">
      <div className="add-form-container">
        <h2>Add a Recipe</h2>
        <form onSubmit={handleSubmit} className="add-form">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="cuisine" placeholder="Cuisine" value={form.cuisine} onChange={handleChange} required />
          <textarea name="ingredients" placeholder="Ingredients (comma separated)" value={form.ingredients} onChange={handleChange} required />
          <textarea name="instructions" placeholder="Instructions" value={form.instructions} onChange={handleChange} required />
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
          {form.image && <img src={form.image} alt="preview" className="preview" />}
          <button type="submit">Submit Recipe</button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
