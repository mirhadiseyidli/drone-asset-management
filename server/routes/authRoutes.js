const express = require('express');
const passport = require('passport');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

const router = express.Router();

// Initiate Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Handle the OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: true }),
  (req, res) => {
    const user = req.user;
    const accessToken = generateAccessToken({ id: user.google_id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id, email: user.email, role: user.role });

    // Send tokens to the client
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.redirect('http://localhost:3002'); // Redirect to the frontend after successful login
  }
);

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) {
      return next(err); // Pass the error to the next middleware for handling
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      // Clear cookies
      res.clearCookie('XSRF-TOKEN'); 
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      res.redirect('http://localhost:3002'); // Redirect to the login page after logout
    });
  });
});

module.exports = router;
