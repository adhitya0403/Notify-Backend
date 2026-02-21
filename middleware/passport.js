import passport from "passport";
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        // 1️⃣ First try to find by googleId
        let user = await User.findOne({ googleId: profile.id });

        // 2️⃣ If not found, try to find by email (existing email user)
        if (!user && email) {
          user = await User.findOne({ email });

          // If email exists but no googleId → link account
          if (user && !user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
        }

        // 3️⃣ If still not found → create new user
        if (!user) {
          user = new User({
            username: profile.displayName,
            email,
            googleId: profile.id,
            profile: profile.photos?.[0]?.value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (err) {
        console.error("Google auth error:", err); // 👈 will show real error
        return done(err, null);
      }
    }
  )
);

export default passport;
