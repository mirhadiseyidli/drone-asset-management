const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  // console.log(req.cookies)
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. No token was provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_API_SECRET); // Temporarily uses the same Secret
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' + error });
  }
};

const checkRole = (roles) => async (req, res, next) => {
  try {
    if (roles.includes(req.user.role)) {
      return next();
    } else {
      return res.status(403).json({ message: 'Permission denied' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

module.exports = { authMiddleware, checkRole };
