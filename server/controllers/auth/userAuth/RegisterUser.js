// Import necessary modules and packages
import AdminModel from "../../../models/adminmodel.js";
import UserModel from "../../../models/usersmodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class RegisterUser {
  // User registration endpoint
  static userRegistration = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Check if any of the required fields are missing
    if (!name || !email || !password || !confirmPassword) {
      res
        .status(400)
        .send({ status: "failed", message: "All fields are required." });
      return;
    }

    // Check if password and confirm_password match
    if (password !== confirmPassword) {
      res.status(400).send({
        status: "failed",
        message: "Password and confirm password do not match.",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res
        .status(400)
        .send({ status: "failed", message: "Invalid email format." });
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

    // Check if user already exists
    const userExists =
      (await UserModel.exists({ email: email })) ||
      (await AdminModel.exists({ email: email }));
    if (userExists) {
      res
        .status(400)
        .send({ status: "failed", message: "User already registered." });
      return;
    }

    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const user = new UserModel({
        name: name,
        email: email,
        password: hashedPassword,
        role: "user",
        groups: [],
      });

      // Save the user to the database
      await user.save();

      // Generate a token for saving in cookies
      const token = jwt.sign(
        { userId: user._id },
        `${process.env.JWT_SECRET_KEY}`,
        { expiresIn: "10m" }
      );

      res.status(201).send({
        status: "success",
        message: "Registration successful.",
        user: user,
        token: token,
      });
    } catch (error) {
      // Handle registration failure
      res.status(500).send({
        status: "failed",
        message: "Registration failed. Please try again.",
        reason: error,
      });
    }
  };
}

export default RegisterUser;
