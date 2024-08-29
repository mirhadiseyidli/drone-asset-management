const { generateAccessToken } = require('../utils/token');
const { tokenMiddleware } = require('../utils/tokenMiddleware');

const express = require('express');

const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/refresh-token', tokenMiddleware, (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token required' });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Generate a new access token
        const newAccessToken = generateAccessToken({ id: user.google_id, email: user.email, role: user.role });
        res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Send access token in a cookie
        res.end();
    });
});

router.get('/get-authorization-token', async (req, res) => {
    const { client_id, client_secret_encoded } = req.params;
  
    try {
      // Find the client credentials in the database
      const clientCredentials = await UserCredentials.findOne({ client_id: client_id });
  
      if (!clientCredentials) {
        return res.status(400).json({ message: 'Invalid client ID' });
      }
  
      // Check if the provided client_secret matches
      const client_secret_decoded = jwt.verify(client_secret_encoded, process.env.JWT_CLIENT_SECRET); // Temporarily uses the same Secret
      if (client_secret_decoded !== clientCredentials.client_secret) {
        return res.status(400).json({ message: 'Invalid client secret' });
      }
  
      // If authentication is successful, generate a JWT token
      const tokenPayload = { id: clientCredentials.user };
      const token = generateAccessToken(tokenPayload);
  
      res.status(200).json({ token: token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

module.exports = router;