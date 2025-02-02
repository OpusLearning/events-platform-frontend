// src/pages/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin]   = useState(false); // admin registration option
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');
  const navigate                = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const role = isAdmin ? 'admin' : 'user';

    axios.post('/api/auth/signup', { name, email, password, role })
      .then(response => {
        setSuccess('Registration successful! Please log in.');
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.status === 409) {
          setError('This email is already registered. Please try another or log in.');
        } else {
          setError('Registration failed. Please try again.');
        }
      });
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      
      {/* Home button above the form */}
      <div className="d-flex justify-content-end mb-3">
        <Link to="/" className="btn btn-primary">Home</Link>
      </div>
      
      <div className="alert alert-info">
        By default, this form registers a regular user. To register as an admin, check the box below.
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input 
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="form-check mb-3">
          <input 
            type="checkbox"
            id="adminCheck"
            className="form-check-input"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="adminCheck">
            Register as Admin
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Log in here</Link>.
      </p>
    </div>
  );
};

export default Register;
