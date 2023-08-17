import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../models/usersmodel.js";


passport.use(
  new GoogleStrategy(
    {
      clientID: "204118146743-c8ahrgko1jkh44dtutlvl5qt6b07ragi.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let existingUser = await UserModel.findOne({ 'email': profile._json.email }); 
        if (existingUser) {
          return done(null, existingUser);
        }
       
        console.log('Creating new user...');
        
        const currentDate = new Date(); 
   
        const month = currentDate.toLocaleString('en-US', { month: 'short' });
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();
        const time = currentDate.toLocaleTimeString('en-US', { timeStyle: 'medium' });
    
        // Create the desired date string
        const ExactDate = ` ${month} ${day}, ${year} ${time}`;

        const newUser = new UserModel({ 
            name: profile.displayName,
            email: profile.emails[0].value,
            time: ExactDate,
            password: `${profile.id}${profile.profileUrl}`,
            role: "user",
            tc: true,
            groups : []
        });


        await newUser.save();
        console.log(newUser)
        return done(null, newUser);
    } catch (error) {
        return done(error, false)
    }



     
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


export default { passport };