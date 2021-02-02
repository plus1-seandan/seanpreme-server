const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
require("dotenv").config();
const User = require("../models/user");

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.

passport.serializeUser((user, done) => {
  console.log({ user });
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("hit this line ");
  const user = await User.findById(id);
  console.log({ deserialedUser: user });
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //check if user already exists
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          //user already in db
          console.log("user found ");
          console.log({ existingUser });
          done(null, existingUser);
        } else {
          const user = new User({
            username: profile.displayName,
            googleId: profile.id,
            email: profile._json.email,
          });
          const newUser = await user.save();
          done(null, newUser);
        }
      } catch (e) {
        console.log(e);
      }
    }
  )
);

// function (token, tokenSecret, profile, done) {
//   console.log({ profile });
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return done(err, user);
//   });
// }
