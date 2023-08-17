import jwt from "jsonwebtoken";

class GoogleAuth {
  // Google Auth Success
  static googleAuthSuccess = async (req, res) => {
    if (req.user) {
      const token = jwt.sign(
        { userId: req.user._id },
        `${process.env.JWT_SECRET_KEY}`,
        { expiresIn: "2m" }
      );
      res
        .status(200)
        .send({
          status: "success",
          message: `Login success ${req.user.role}`,
          token: token,
          user: req.user,
        });
    } else {
      res
        .status(401)
        .send({ status: "failed", message: "login in failure", error: true });
    }
  };
}

export default GoogleAuth;
