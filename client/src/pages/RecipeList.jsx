import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function RecipeList() {
  const [list, setList] = useState([]);
  useEffect(() => axios.get('http://localhost:5000/api/recipes', {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
  }).then(r => setList(r.data)), []);

  return (
    <div className="list">
      {list.map(r => (
        <div className="card" key={r._id}>
          <img src={r.image} alt={r.title} />
          <h3>{r.title}</h3>
          <p><strong>Origin:</strong> {r.origin}</p>
          <p><strong>Ingredients:</strong> {r.ingredients.join(', ')}</p>
          <p><strong>Instructions:</strong> {r.instructions}</p>
        </div>
      ))}
    </div>
  );
}
