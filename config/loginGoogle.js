import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { User } from "../models/User.js";

const loginGoogle = new GoogleStrategy(
  {
    clientID: "your client id",
    clientSecret: "your client secret",
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  async (request, accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile);
      // find user in database
      const user = await User.findOne({ email: profile.email });
      if (user) {
        return done(null, user);
      }
      // create user if not exists
      const newUser = await User.create({
        name: profile.displayName,
        email: profile.email,
        password: profile.id,
        userName: profile.email,
      });
      return done(null, newUser);
    } catch (error) {
      done(error);
    }
  }
);

export default loginGoogle;
