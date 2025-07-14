import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Home.css";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
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
    </nav>
  );
}
