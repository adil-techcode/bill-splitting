// Import necessary models
import UserModel from "../../models/usersmodel.js";
import GroupModel from "../../models/groupmodel.js";

// GroupRegistration class with static method for registering new groups
class GroupRegistration {
  // Method to register a new group
  static groupRegistration = async (req, res) => {
    const { name, creatorId,  participants } = req.body; // Get input values

    // Validate required fields
    if (!name || !creatorId  || !participants) {
      return res
        .status(400)
        .send({ status: "failed", message: "All Fields Required" });
    }

    const registeredParticipant = []; // Empty array to store registered users

    try {
      // Loop through the participants array to check if users are registered
      for (let i = 0; i < participants.length; i++) {
        const user = await UserModel.findOne({ email: participants[i] });

        if (user) {
          // If user is registered, add their details to the registeredParticipant array
          registeredParticipant.push({
            _id: user._id,
            name: user.name,
            email: user.email,
          });
        } else {
          // If a participant is not registered, send a failure response
          return res
            .status(400)
            .send({
              status: "failed",
              message: `${participants[i]} is not registered`,
            });
        }
      }

      // Create a new object to save group data to the database
      const group = new GroupModel({
        name: name,
        creatorId: creatorId,
        isActive: true,
        participants: registeredParticipant,
      });

      const createdGroup = await group.save();

      // Update the userGroups array of each registered participant with the created group ID for future reference
      for (let i = 0; i < registeredParticipant.length; i++) {
        await UserModel.updateOne(
          { _id: registeredParticipant[i]._id },
          { $push: { groups: createdGroup._id } }
        );
      }

      res
        .status(201)
        .send({
          status: "success",
          message: "Group registration successful",
          Groupname: name,
        });
    } catch (error) {
      res
        .status(500)
        .send({
          status: "failed",
          message: "Internal Server Error",
          reason: error,
        });
    }
  };
}

export default GroupRegistration;
