const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. No token was provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized ahahhah' + error });
    }
};

module.exports = { tokenMiddleware };
