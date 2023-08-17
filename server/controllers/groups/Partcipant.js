import GroupModel from "../../models/groupmodel.js";
import UserModel from "../../models/usersmodel.js";

class Participant {
  static addParticiapnt = async (req, res) => {
    const { groupId, email } = req.body;

    // Check for groupId and email required
    if (!groupId || !email) {
      return res
        .status(400)
        .json({ status: "failed", message: "GroupId and Email Required" });
    }

    try {
      // First Find User in User Model
      let IsUser = await UserModel.findOne({ email: email });

      if (!IsUser) {
        return res
          .status(400)
          .json({ status: "failed", message: "User Not Registered AT SHareX" });
      }

      // Find Group
      const group = await GroupModel.findById(groupId);

      if (!group) {
        return res.status(400).json({
          status: "failed",
          message: "Incorrect GroupId Or Group not Found",
        });
      }

      const participants = group.participants;

      // Check if the user is already added as a participant in the group
      for (let i = 0; i < participants.length; i++) {
        if (email === participants[i].email) {
          return res
            .status(400)
            .json({ status: "failed", message: "User Already Added" });
        }
      }

      // Create a participant object with user details
      const participant = {
        _id: IsUser._id,
        name: IsUser.name,
        email: IsUser.email,
      };

      // Update the group's participants array with the new participant
      await GroupModel.updateOne(
        { _id: groupId },
        { $push: { participants: participant } }
      );

      // Update the user's groups array with the new group ID
      await UserModel.updateOne(
        { _id: IsUser._id },
        { $push: { groups: groupId } }
      );

      return res.status(200).json({ status: "success", message: "Successful" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "failed", message: "Database Error", reason: error });
    }
  };

  // Method to remove a participant from a group
  static removeParticipant = async (req, res) => {
    const { groupId, participantId } = req.body;

    if (!groupId || !participantId) {
      res.status(400).send({
        status: "failed",
        message: " GroupId and Participant Object Id not Found",
      });
    }
    try {
      const group = await GroupModel.findById(groupId);

      if (!group) {
        res.status(400).send({
          status: "failed",
          message: "Incorrect GroupId Or Group not Found",
        });
      }

      // Remove the participant from the group's participants array
      await GroupModel.findOneAndUpdate(
        { _id: groupId },
        { $pull: { participants: { _id: participantId } } }
      );

      // Remove the group from the user's groups array
      await UserModel.findOneAndUpdate(
        { _id: participantId },
        { $pull: { groups: groupId } }
      );

      res.status(200).send({
        status: "success",
        message: "Participant successfully removed from the group",
      });
    } catch (error) {
      res
        .status(500)
        .send({ status: "failed", message: "Database Error", reason: error });
    }
  };
}

export default Participant;
