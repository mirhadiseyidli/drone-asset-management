const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../database/schemas/userSchema');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile.photos[0].value)
      let user = await User.findOne({ google_id: profile.id });
      if (!user) {
        user = await User.create({
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          username: profile.emails[0].value,
          email: profile.emails[0].value,
          role: 'member',
          google_id: profile.id,
          profile_picture: profile.photos[0].value,
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});
