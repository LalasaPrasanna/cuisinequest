import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Login({ setUser }) {
  const [isReg, setIsReg] = useState(false);
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    const url = `http://localhost:5000/api/users/${isReg ? 'register' : 'login'}`;
    const { data: res } = await axios.post(url, data);
    localStorage.setItem('user', JSON.stringify(res));
    setUser(res);
    nav('/');
  };

  return (
    <div className="login">
      <h2>{isReg ? 'Register' : 'Login'}</h2>
      <form onSubmit={submit}>
        {isReg && <input name="name" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} placeholder="Name" required />}
        <input name="email" type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} placeholder="Email" required />
        <input name="password" type="password" value={data.password} onChange={e => setData({ ...data, password: e.target.value })} placeholder="Password" required />
        <button type="submit">{isReg ? 'Register' : 'Login'}</button>
      </form>
      <p onClick={() => setIsReg(!isReg)}>{isReg ? 'Login here' : 'Register here'}</p>
    </div>
  );
}
