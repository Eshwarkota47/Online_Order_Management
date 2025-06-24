import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      {orders.length > 0 ? (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <p>Order ID: {order._id}</p>
              <p>Product: {order.productName}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Total Price: ₹{order.totalPrice}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading orders...</p>
      )}
    </div>
  );
};

export default OrdersPage;
