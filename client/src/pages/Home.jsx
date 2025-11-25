import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home({ user, onLogout }) {
  return (
    <div className="home-container">
      <div className="home-buttons">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/add">Add Recipe</Link>
            <Link to="/recipes">Recipe List</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>

      {user ? (
        <>
          <h1>Hello {user.name}!</h1>
          <h2>Welcome to Cuisine Quest :)</h2>
        </>
      ) : (
        <h2>Welcome to Cuisine Quest :)</h2>
      )}
    </div>
  );
}
