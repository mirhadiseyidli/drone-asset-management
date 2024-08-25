import React from 'react';

const Navbar = () => {
  const handleLogout = () => {
    window.location.href = '/api/auth/logout';
  };

  return (
    <nav className="navbar">
      <h1>Drone Asset Management</h1>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
