import jwt from "jsonwebtoken";
import UserModel from "../models/usersmodel.js";
import AdminModel from "../models/adminmodel.js";

// Middleware function to check user authentication using JWT
const checkUserAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    // Check if the request contains a valid JWT token
    if (authorization && authorization.startsWith("Bearer")) {
      const token = authorization.split(" ")[1];

      // If no token is found, return unauthorized status
      if (!token) {
        return res
          .status(401)
          .send({ status: "failed", message: "Unauthorized: No Token" });
      }

      // Verify the token using the JWT_SECRET_KEY
      const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Check if the user is an admin or a regular user based on the userId
      const user =
        (await AdminModel.findById(userId).select("-password")) ||
        (await UserModel.findById(userId).select("-password"));

      // If user not found, return unauthorized status
      if (!user) {
        return res
          .status(401)
          .send({ status: "failed", message: "Unauthorized User" });
      }

      // Add the user object to the request for use in subsequent middleware or route handler
      req.user = user;
      next();
    } else {
      // If no valid authorization header is found, return unauthorized status
      return res
        .status(401)
        .send({ status: "failed", message: "Unauthorized User" });
    }
  } catch (error) {
    // If an error occurs during verification, return unauthorized status with error details
    res
      .status(401)
      .send({ status: "failed", message: "Unauthorized User data", error });
  }
};

export default checkUserAuth;
