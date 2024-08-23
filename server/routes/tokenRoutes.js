const express = require('express');
const { generateAccessToken } = require('../utils/token');
const { tokenMiddleware } = require('../utils/tokenMiddleware');
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

module.exports = router;