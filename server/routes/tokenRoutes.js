const express = require('express');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');
const { tokenMiddleware } = require('../utils/tokenMiddleware');

const router = express.Router();

router.post('/refresh-token', tokenMiddleware, (req, res) => {

    const csrfToken = req.headers['x-csrf-token'];
    console.log('Received CSRF Token:', csrfToken);
    const refreshToken = req.body.token;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token required' });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.JWT_API_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Generate a new access token
        const newAccessToken = generateAccessToken({ id: user.google_id, email: user.email, role: user.role });
        res.cookie('accessToken', newAccessToken, { httpOnly: true }); // Send access token in a cookie
    });
});

module.exports = router;