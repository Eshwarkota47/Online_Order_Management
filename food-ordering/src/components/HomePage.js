import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here, such as clearing session data
    navigate('/signin');
  };

  return (
    <div className="home">
      <div className="sidebar">
        <button className="active" onClick={() => navigate('/')}>HOME</button>
        <button onClick={() => navigate('/menu')}>MENU</button>
        <button onClick={() => navigate('/orders')}>ORDERS</button>
        <button onClick={handleLogout}>LOGOUT</button> {/* New Logout Button */}
      </div>
      <div className="content">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button><i className="fas fa-search"></i></button>
        </div>
        <div className="logo-placeholder">
          <h1>PES UNIVERSITY</h1>
        </div>
        <div className="special">
          <h2>TODAY'S SPECIAL</h2>
          <div className="special-items">
            <p>🍕 Pizza</p>
            <p>🍔 Burger</p>
            <p>🍦 Ice Cream</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
