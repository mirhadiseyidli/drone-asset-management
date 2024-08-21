const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenMiddleware = (req, res, next) => {
  console.log(req.cookies)
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. No token was provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_API_SECRET); // Temporarily uses the same Secret
    req.user = decoded;
    console.log('this works')
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' + error });
  }
};

module.exports = { tokenMiddleware };
