import React from 'react';
import logo from '../styles/images/logo.png'

const Navbar = () => {
  const handleLogout = () => {
    window.location.href = 'http://localhost:5002/api/auth/logout';
  };

  return (
    <nav className="navbar">
      <div>
        <img src={logo} className="skydio-navbar-logo" />
      </div>
      <div>
        <h1 className='navbar-app-name'>Drone Asset Management</h1>
      </div>
      <div>
      <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
