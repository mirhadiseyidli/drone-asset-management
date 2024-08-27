import React from 'react';
import googleLogo from '../styles/images/google.png'
import loginImage from '../styles/images/loginbackground.png'
import skydioLogo from '../styles/images/logo.png'

function LoginPage() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5002/api/auth/google';
  };

  return (
    <div className="login-page-container">
      <div className="login-content">
        <img src={skydioLogo} alt="Skydio logo" className="skydio-logo" />
        <div className="login-container">
          <div className="login-card-container">
            <h1 className="welcome-message-login-2">Skydio Drone Asset Management</h1>
            <h1 className="welcome-message-login-1">Welcome!</h1>
            <h3 className="login-message">Please login to continue!</h3>
            <button onClick={handleLogin}>
              <img src={googleLogo} alt="Google logo" className="google-logo" />
              <h3>Login with Google</h3>
            </button>
          </div>
        </div>
        <p className="url-login">drones.skyd.io</p>
      </div>
      <div className="image-container">
        <img src={loginImage} alt="Login illustration" className="login-image" />
      </div>
    </div>
  );
}

export default LoginPage;
