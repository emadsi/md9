import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Post request to the backend for authentication
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // Store JWT token
      localStorage.setItem('token', data.token);
      // Navigate to Admin Dashboard page
      navigate('/admin');
    } else {
      alert('Login failed!');
    }
  };

  return (
    <div className='loginPage-container'>
      <form className="form" onSubmit={handleSubmit}>
        <div className='form-section'>
          <label>Username:</label>
          <input 
            type="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username" 
            required 
          />
        </div>
        <div className='form-section'>
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
          />
        </div>
        <div className='submit-button' >
          <button type="submit">Login</button>
        </div>
    </form>
    </div>
  );
};

export default LoginPage;
