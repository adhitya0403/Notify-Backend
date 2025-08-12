import passport from "passport";
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();


passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },

    async (accessToken, refreshToken, profile, done) =>{
      try {
       // find user by googleId
        let user = await User.findOne({ googleId: profile.id });

       // If not found, create a new user
        if (!user) {
          user = new User({
            username: profile._json.name,
            email: profile._json.email,
            googleId: profile._json.sub,
            profile:profile._json.picture
          });
          await user.save()
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
