const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_API_SECRET, { expiresIn: '1m' }); // short-lived token NOTE: currently 1 min cuz I was testing the CSRF, needed it to expire faster. Temporarily uses the same Secret
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.JWT_API_SECRET, { expiresIn: '7d' }); // long-lived token NOTE: Temporarily uses the same Secret
}

module.exports = { generateAccessToken, generateRefreshToken };
