import React, { useContext } from 'react';
import { AuthContext } from '../App';
import './ProfilePage.css';

const ProfilePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('user'));

  if (!isAuthenticated) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
