// Import necessary models
import AdminModel from "../../../models/adminmodel.js";
import UserModel from "../../../models/usersmodel.js";

// Class to verify user existence
class VerifyingUser {
  // Method to check if a user exists or not
  static isUser = async (req, res) => {
    const { email } = req.body;
try{

    // Check if the email exists in either UserModel or AdminModel
    const userExists =
      (await UserModel.exists({ email: email })) ||
      (await AdminModel.exists({ email: email }));

    if (userExists) {
      // If user exists, send a success response
      return res.status(200).send({ status: "success", message: `User found` });
    } else {
      // If user doesn't exist, send a failure response with the email address
      return res
        .status(400)
        .send({
          status: "failed",
          message: `User with email ${email} not found`,
        });
    }

  } catch(error){
    return res
        .status(500)
        .send({
          status: "failed",
          message: `Internal Server Error`,
          error: error,
        });
  }
  };
}

// Export the VerifyingUser class to be used in other files
export default VerifyingUser;
