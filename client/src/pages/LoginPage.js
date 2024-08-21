import React from 'react';

function LoginPage() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5002/api/auth/google';
  };

  return (
    <div className="login-page">
      <h2>Login to Drone Asset Management</h2>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default LoginPage;
