// Import necessary modules and packages
import AdminModel from "../../../models/adminmodel.js";
import UserModel from "../../../models/usersmodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class NewPassword {
  // Password Reset
  static resetPassword = async (req, res) => {
    const { id, token, password, confirmPassword } = req.body;

    // Check if password and confirm_password match
    if (password !== confirmPassword) {
      res.status(400).send({
        status: "failed",
        message: "Password and confirm password do not match.",
      });
      return;
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      res.status(400).send({
        status: "failed",
        message:
          "Password must contain at least 8 characters, including uppercase and lowercase letters, and a number.",
      });
      return;
    }

    // Find User by Id
    const user =
      (await AdminModel.findById(id)) || (await UserModel.findById(id));

    if (user) {
      // Secret key used to verify the token sent in the email
      const secretKey = user._id + process.env.JWT_SECRET_KEY;

      try {
        // Verify token
        const { userId } = jwt.verify(token, secretKey);

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update the User by Role
        const Model = user.role === "user" ? UserModel : AdminModel;
        await Model.findByIdAndUpdate(user._id, {
          $set: { password: hashedPassword },
        });

        return res.status(200).send({
          status: "success",
          message: `Password reset successfully.`,
        });
      } catch (error) {
        if (error.message === "jwt expired") {
          console.log("Token expired");
          return res.status(419).send({
            status: "failed",
            message: "Session expired. Please try again.",
          });
        }
      
        return res.status(500).send({
          status: "failed",
          message: `Internal Server Error.`,
          error: error,
        });
      }
    } else {
      // If user not found
      res.status(400).send({ status: "failed", message: "User not found." });
    }
  };
}

export default NewPassword;
