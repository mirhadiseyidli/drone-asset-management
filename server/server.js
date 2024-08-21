require('./services/authService');
require('./database/connection');
require('dotenv').config();

const MongoStore = require('connect-mongo');

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const droneRoutes = require('./routes/droneRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3002',
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
    mongoUrl: "mongodb://localhost:27017/",
    collectionName: 'sessions',
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Send only over HTTPS in production, still need to figure out how to implement SSL Cert stuff
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 Week
  },
}));

const csrfProtection = csrf({ cookie: true, sessionKey: 'Session Cookie' });
app.use(csrfProtection);

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/csrf-token', (req, res) => {
  const csrfToken = req.csrfToken();
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

app.use('/api/auth', authRoutes);
app.use('/api/token', tokenRoutes);
app.use('/api/drones', droneRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
