const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const state = req.query.state; // 'admin' or 'client'
      const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

      if (!email) {
        return done(null, false, { message: 'Google account missing email' });
      }

      if (state === 'admin') {
        // Strictly allow ONLY this email for Google Admin Auth
        const allowedEmail = 'abhiraj258090@gmail.com';
        
        if (email.toLowerCase() !== allowedEmail) {
          return done(null, false, { message: 'Access Denied: Unauthorized Google Account' });
        }

        let admin = await Admin.findOne({ 
          $or: [{ googleId: profile.id }, { email: email.toLowerCase() }] 
        });

        if (!admin) {
          admin = new Admin({
            googleId: profile.id,
            email: email.toLowerCase(),
            username: `admin_${profile.id}`, // Guarantee format and uniqueness
            name: profile.displayName,
            profilePic: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
            authProvider: 'google'
          });
          await admin.save();
        } else if (!admin.googleId) {
          admin.googleId = profile.id;
          admin.name = admin.name || profile.displayName;
          admin.profilePic = admin.profilePic || (profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null);
          admin.authProvider = 'google';
          await admin.save();
        }
        
        admin.role = 'admin'; // attach role payload
        return done(null, admin);
      } else {
        // Client flow
        let user = await User.findOne({ 
          $or: [{ googleId: profile.id }, { email: email.toLowerCase() }] 
        });

        if (!user) {
          user = new User({
            googleId: profile.id,
            email: email.toLowerCase(),
            username: `google_${profile.id}`, // Guaranteed unique
            name: profile.displayName,
            profilePic: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
            authProvider: 'google',
            role: 'client'
          });
          await user.save();
        } else if (!user.googleId) {
          user.googleId = profile.id;
          user.name = user.name || profile.displayName;
          user.profilePic = user.profilePic || (profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null);
          user.authProvider = 'google';
          await user.save();
        }

        user.role = user.role || 'client'; // fallback
        return done(null, user);
      }
    } catch (err) {
      console.error('Passport Google Auth Error:', err);
      return done(err, false, { message: 'Server error during auth' });
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
