import React from 'react';

function AddRecipe({ form, handleChange, handleSubmit }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange({ target: { name: 'image', value: reader.result } });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '2rem',
      backgroundColor: '#121212',
      color: 'white',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#1f1f1f'
      }}>
        <h2 style={{ textAlign: 'center' }}>Add a Recipe</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="cuisine" placeholder="Cuisine" value={form.cuisine} onChange={handleChange} />
          <textarea name="ingredients" placeholder="Ingredients (comma separated)" value={form.ingredients} onChange={handleChange} required />
          <textarea name="instructions" placeholder="Instructions" value={form.instructions} onChange={handleChange} required />
          
          {/* ✅ Image Upload Field */}
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;

