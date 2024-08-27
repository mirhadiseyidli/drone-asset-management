import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DroneList from './components/DroneList';
import Navbar from './components/Navbar';
import axios from 'axios';
import './styles/App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  const fetchAuthAndCsrf = async () => {
    try {
      // Fetch CSRF token
      const csrfResponse = await axios.get('http://localhost:5002/api/csrf-token', { withCredentials: true });
      setCsrfToken(csrfResponse.data.csrfToken);

      // Check if user is authenticated
      const authResponse = await axios.get('http://localhost:5002/api/check-auth', { withCredentials: true });
      if (authResponse.data.user) {
        setIsAuthenticated(true);
        console.log('user logged in'); // Seems CSRF token worked here as this part works
      } else {
        setIsAuthenticated(false);
        console.log('user not logged in'); // Seems CSRF token worked here as this part works
      }
    } catch (error) {
      console.error('Error during authentication or fetching CSRF token:', error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    fetchAuthAndCsrf();
  }, []);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <DroneList /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
