require('./services/authService');
require('./database/connection');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const MongoStore = require('connect-mongo');
const csrf = require('csrf'); // Import the csrf library

const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const droneRoutes = require('./routes/droneRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const csrfTokens = new csrf(); // Initialize a new CSRF instance

app.use(cors({
  origin: 'http://127.0.0.1:3050/',
  credentials: true
}));
app.use(express.json());

app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
app.use(session({
  cookieName: 'Session Cookie',
  secret: process.env.JWT_API_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: "mongodb://mongo:27017",
    collectionName: 'sessions',
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 Week
  },
}));

// Middleware to generate CSRF secret and token
app.use((req, res, next) => {
  if (!req.session.csrfSecret) {
    req.session.csrfSecret = csrfTokens.secretSync();
  }
  res.locals.csrfToken = csrfTokens.create(req.session.csrfSecret);
  next();
});

// Middleware to validate CSRF token
const csrfProtection = (req, res, next) => {
  const token = req.cookies['XSRF-TOKEN'] || req.headers['x-xsrf-token'] || req.body._csrf || req.query._csrf;
  if (!csrfTokens.verify(req.session.csrfSecret, token)) {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }
  next();
};

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/csrf-token', (req, res) => {
  const csrfToken = res.locals.csrfToken;
  res.cookie('XSRF-TOKEN', csrfToken, { httpOnly: true });
  res.json({ csrfToken });
});

app.get('/api/check-auth', csrfProtection, (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.use('/api/auth', csrfProtection, authRoutes);
app.use('/api/token', csrfProtection, tokenRoutes);
app.use('/api/drones', csrfProtection, droneRoutes);
app.use('/api/users', csrfProtection, userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
