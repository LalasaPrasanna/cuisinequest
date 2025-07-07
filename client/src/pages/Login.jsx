import React, { useState } from 'react';
import '../styles/Login.css';

function Login({ onLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true); // ✅ Needed

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('⏳ Submitting form...');

  const endpoint = isLogin ? 'login' : 'register';
  const payload = isLogin
    ? { email: form.email, password: form.password }
    : { name: form.name, email: form.email, password: form.password };

  try {
    const res = await fetch(`http://localhost:5000/api/users/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log('✅ Response:', data);

    if (res.ok) {
      localStorage.setItem('token', data.token);
      onLogin(true); // this should redirect
    } else {
      alert(data.message || 'Login/Register failed');
    }
  } catch (err) {
    console.error('❌ Error during fetch:', err);
    alert('Network error, please check your backend');
  }
};


  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>

        {!isLogin && (
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">{isLogin ? 'Log In' : 'Register'}</button>

        <p style={{ textAlign: 'center' }}>
          {isLogin ? "Don't have an account?" : 'Already registered?'}{' '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: 'lightblue', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isLogin ? 'Register' : 'Log In'}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
