import React from 'react';
import '../styles/Home.css'; // ✅ Plain CSS import

function Home() {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>🍽️ Welcome to CuisineQuest</h1>
        <p>Discover and share delicious vegetarian recipes from around the world.</p>
        <p>Please <strong>log in</strong> to access and contribute to the recipe collection.</p>
      </div>
    </div>
  );
}

export default Home;
