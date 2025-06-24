import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import OrdersPage from './components/OrdersPage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import PaymentPage from './components/PaymentPage'; // Import the Payment Page

// Create an Auth Context
export const AuthContext = createContext(null);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/home"
            element={
              isAuthenticated ? <HomePage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/menu"
            element={
              isAuthenticated ? <MenuPage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/orders"
            element={
              isAuthenticated ? <OrdersPage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/admin"
            element={<SignInPage />} // Placeholder for Admin functionality
          />
          <Route
            path="/payment"
            element={
              isAuthenticated ? <PaymentPage /> : <Navigate to="/signin" />
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
