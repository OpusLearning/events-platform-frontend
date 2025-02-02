// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate                = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    axios.post('/api/auth/login', { email, password })
      .then(response => {
        const { token, user } = response.data;
        localStorage.setItem('userToken', token);
        alert(`Welcome, ${user.name || user.email || 'User'}!`);

        // Navigate based on the user's role:
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/my-events');
        }
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.status === 401) {
          setError('Invalid email or password.');
        } else {
          setError('Login failed. Please try again.');
        }
      });
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <div className="d-flex justify-content-end mb-3">
        <Link to="/" className="btn btn-primary">Home</Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input 
            type="email" 
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input 
            type="password" 
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
};

export default Login;
