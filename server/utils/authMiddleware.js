const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  console.log(req.cookies)
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

module.exports = { authMiddleware };
