import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../App';
import './AdminPage.css';

const AdminPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!isAuthenticated || user.email !== 'admin@example.com') {
      window.location.href = '/signin';
    }
  }, [isAuthenticated, user]);

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
    </div>
  );
};

export default AdminPage;
