import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import session from "express-session";
import pass from "./config/passport.js";
import passport from "passport";
import rateLimit from "express-rate-limit";


const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: "http://localhost:3000", // Replace with your React app's origin
  credentials: true,
}));
app.use(bodyParser.json({ extended: true }));

// Apply rate limiting middleware
// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 2, // Max requests per windowMs
//   message: "Too many requests from this IP, please try again later.",
// });


// // Custom middleware to set default response headers
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your React app's origin
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// app.use(limiter);


// // Error handler for 429 Too Many Requests
// app.use((err, req, res, next) => {
//   if (err instanceof rateLimit.RateLimitError) {
//     return res.status(429).json({ error: "Too many requests. Please try again later." });
//   }
//   console.log(err)
//   next(err);
// });





// Google Auth Config
app.use(
  session({
    secret: "mysession",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());




// Connection To Database
mongoose.connect("mongodb://0.0.0.0:27017/Expenses_Sharing");




//  Adding Routes
import userRouter from "./routes/Auth/UserRouter.js";
app.use("/auth/user", userRouter);


import googleAuthRouter from "./routes/Auth/GoogleRouter.js";
app.use("/auth/google", googleAuthRouter);


import groupRouter from "./routes/groups/GroupRouter.js";
app.use("/user/group", groupRouter);


import expenseRouter from "./routes/expense/ExpenseRouter.js";
app.use("/user/group/expense", expenseRouter);

import adminRouter from "./routes/admin/AdminRoutes.js";
app.use("/admin", adminRouter);

import termRouter from "./routes/Terms/TermRouter.js";
app.use("/terms", termRouter);

import policyRouter from "./routes/policy/PolicyRouter.js";
app.use("/policy", policyRouter);

import faqRouter from "./routes/faq/FaqRouter.js";
app.use("/faq", faqRouter);







app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
