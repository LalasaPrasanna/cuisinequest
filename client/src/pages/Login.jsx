import React, { useState } from 'react';
import '../styles/Login.css';

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (form.email === 'admin@example.com' && form.password === 'admin123') {
        onLogin(true);
      } else {
        alert('Invalid credentials');
      }
    } else {
      alert('Registered successfully!');
      setIsLogin(true);
    }
    setForm({ email: '', password: '' });
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">{isLogin ? 'Log In' : 'Register'}</button>
        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Log In'}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
