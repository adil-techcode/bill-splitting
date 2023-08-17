import express from "express";
const googleAuthRouter = express.Router();
import passport from "passport";

import GoogleAuth from "../../controllers/auth/googleAuth/GoogleAuth.js";

// Google  Auth Routes

//Main Route for Displaying page
googleAuthRouter.get(
  "/",
  passport.authenticate("google", ["profile", "email"])
);

// Call Back Route
googleAuthRouter.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/google/auth",
    failureRedirect: "http://localhost:3000/login",
  })
);

googleAuthRouter.get("/login/failed", (req, res) => {
  res
    .status(401)
    .send({
      status: "failed",
      message: "login in failure",
      error: true,
      user: req.user,
    });
});

googleAuthRouter.get("/login/success", GoogleAuth.googleAuthSuccess);

googleAuthRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/");
});

export default googleAuthRouter;
