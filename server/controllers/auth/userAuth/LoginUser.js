// Import necessary modules and packages
import AdminModel from "../../../models/adminmodel.js";
import UserModel from "../../../models/usersmodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class LoginUser {
  // User login endpoint
  static userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if the user exists in either UserModel or AdminModel
      const user =
        (await UserModel.findOne({ email: email })) ||
        (await AdminModel.findOne({ email: email }));

      if (user) {
        // Compare the provided password with the stored password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch && user.email == email) {
          // Determine the user type based on the role
          const userType = user.role === "admin" ? "Admin" : "User";

          // Generate JWT token with additional properties
          const token = jwt.sign(
            { userId: user._id },
            `${process.env.JWT_SECRET_KEY}`,
            { expiresIn: "10m" }
          );

          // Send a success response with the appropriate message, token, and user data
          res.status(200).send({
            status: "success",
            message: `Logged in successfully as ${userType}.`,
            token: token,
            user: user,
          });
        } else {
          // Send a failure response for incorrect email or password
          res
            .status(400)
            .send({ status: "failed", message: "Invalid email or password." });
        }
      } else {
        // Send a failure response if the user is not found
        res.status(400).send({ status: "failed", message: "User not found." });
      }
    } catch (error) {
      // Send a failure response for server errors
      res
        .status(500)
        .send({
          status: "failed",
          message: "Internal server error.",
          error: error,
        });
    }
  };
}

export default LoginUser;
