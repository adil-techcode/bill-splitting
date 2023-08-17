import express from "express";
const userRouter = express.Router();

import RegsiterUser from "../../controllers/auth/userAuth/RegisterUser.js";
import LoginUser from "../../controllers/auth/userAuth/LoginUser.js";
import NewPassword from "../../controllers/auth/userAuth/NewPassword.js";
import ForgetPassword from "../../controllers/auth/userAuth/ForgetPassword.js";
import VerifyingUser from "../../controllers/auth/userAuth/VerifyingUser.js";

// Public Routes

// Auth Routes
userRouter.post("/register", RegsiterUser.userRegistration);
userRouter.post("/login", LoginUser.userLogin);
userRouter.post(
  "/sendresetpasswordemail",
  ForgetPassword.sendResetPasswordEmail
);
userRouter.post("/resetpassword", NewPassword.resetPassword);

// Verifying User
userRouter.post("/isuser", VerifyingUser.isUser);

export default userRouter;
