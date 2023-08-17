// Import necessary modules and packages
import AdminModel from "../../../models/adminmodel.js";
import UserModel from "../../../models/usersmodel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import transporter from "../../../config/emailconfig.js";
dotenv.config();

class ForgetPassword {
  // Method to send a reset password email
  static sendResetPasswordEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({
        status: "failed",
        message: "Please provide an email address.",
      });
    }

    try {
      // Find the user in UserModel or AdminModel based on the provided email
      const user =
        (await UserModel.findOne({ email })) ||
        (await AdminModel.findOne({ email }));

      if (!user) {
        // User not found in UserModel or AdminModel
        return res.status(400).send({
          status: "failed",
          message: "User not found for the provided email.",
        });
      }
      // Secret key for JSON Web Token
      const secretKey = user._id + process.env.JWT_SECRET_KEY;

      // Create a Token for Verifying User and set it to expire in 10 minutes
      const token = jwt.sign({ userId: user._id }, secretKey, {
        expiresIn: "1m",
      });

      // Generate a link for the frontend page where users can enter a new password and include it in the email
      const link = `http://localhost:3000/new-password/${user._id}/${token}`;

      // Send an email with the Nodemailer transporter imported from the config/emailconfig file

      const mailer = await transporter.sendMail({
        from: "adil.techcode@gmail.com",
        to: user.email,
        subject: "Go-Split Password Reset",
        html: `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
            <style>
              /* CSS Styles for the email */
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                background-color: #f6f6f6;
                margin: 0;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 4px;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
                font-size: 24px;
                margin-bottom: 20px;
                text-align: center;
              }
              p {
                margin-bottom: 20px;
              }
              a {
                color: #fff;
                text-decoration: none;
                background-color: #007bff;
                padding: 10px 20px;
                border-radius: 4px;
                display: inline-block;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                color: #777;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Go-Split Password Reset</h1>
              <p>Dear User,</p>
              <p>We received a request to reset your password. Please click the button below to proceed with the password reset. This link will expire in 10 minutes:</p>
              <p>
                <a href="${link}" target="_blank">Reset Password</a>
              </p>
              <p>If you did not request a password reset, you can safely ignore this email.</p>
              <p>Thank you,</p>
              <p>The Go-Split Team</p>
              <div class="footer">
                <p>© 2023 Go-Split. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
          `,
      });

      // Email sent successfully
      return res.status(200).send({
        status: "success",
        message: "Password reset email sent successfully.",
        mail: mailer,
      });
    } catch (error) {
      return res.status(500).send({
        status: "success",
        message: "Internal Server Error.",
        error: error,
      });
    }
  };
}

export default ForgetPassword;
