import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>LOGIN</h1>
      <div className="buttons">
        <button onClick={() => navigate('/signin')}>STUDENT</button>
        <button onClick={() => navigate('/admin')}>ADMIN</button> {/* Placeholder for Admin functionality */}
      </div>
    </div>
  );
};

export default LandingPage;
