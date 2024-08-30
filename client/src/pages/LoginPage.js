import React from 'react';

function LoginPage() {
  const handleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <div className="login-page">
      <h2>Login to Drone Asset Management</h2>
      <h1>Here</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default LoginPage;
