import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../App';
import './MenuPage.css';

const MenuPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [menuItems, setMenuItems] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      fetchMenuItems();
    }
  }, [isAuthenticated, navigate]);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleAddItem = (item) => {
    const itemWithQuantity = { ...item, quantity: 1 };
    setOrder((prevOrder) => [...prevOrder, itemWithQuantity]);
    localStorage.setItem('order', JSON.stringify([...order, itemWithQuantity]));
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/signin');
  };

  return (
    <div className="home">
      <div className="sidebar">
        <button onClick={() => navigate('/home')}>HOME</button>
        <button className="active" onClick={() => navigate('/menu')}>MENU</button>
        <button onClick={() => navigate('/orders')}>ORDERS</button>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
      <div className="content">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button><i className="fas fa-search"></i></button>
        </div>
        <h1>Menu</h1>
        <div className="menu-categories">
          {menuItems.length > 0 ? menuItems.map((section, index) => (
            <div key={index} className="menu-category">
              <h2>{section.category}</h2>
              <div className="menu-items">
                {section.items.map((item, idx) => (
                  <div key={idx} className="menu-item">
                    <p>{item.name}: ₹{item.price}</p>
                    <button className="add-button" onClick={() => handleAddItem(item)}>+</button>
                  </div>
                ))}
              </div>
            </div>
          )) : <p>Loading menu items...</p>}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
