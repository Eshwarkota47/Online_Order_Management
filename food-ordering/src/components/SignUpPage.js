import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../App';
import './Auth.css';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill out all fields");
      setSuccess(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSuccess(false);
      return;
    }

    try {
      const id = Math.floor(Math.random() * 10000);
      const response = await axios.post('http://localhost:5000/signup', { id, name, email, password });
      setError('');
      setSuccess(true);
      setIsAuthenticated(true);
      console.log("Account created successfully!");
      setTimeout(() => navigate('/home'), 1500);
    } catch (error) {
      console.error("There was an error creating the account!", error);
      setError("An error occurred. Please try again later.");
      setSuccess(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-logo">PES UNIVERSITY</div>
      {success && (
        <div className="success-message">
          <span className="success-tick">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path fill="#4CAF50" d="M10 15l-5-5 1.41-1.41L10 12.17l7.29-7.29L19 6l-9 9z" />
            </svg>
          </span>
          Account created successfully!
        </div>
      )}
      <h2>Create an Account</h2>
      <form className="auth-form" onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="auth-footer">
        <p>Already have an account? <Link to="/signin">Sign In</Link></p>
      </div>
    </div>
  );
};

export default SignUpPage;
