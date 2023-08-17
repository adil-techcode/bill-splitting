import GroupModel from "../../models/groupmodel.js";

class UpdateGroup {
  // Method to update the name of a group
  static updateGroupName = async (req, res) => {
    const { groupId, name } = req.body;

    try {
      // Find the group and update its name
      await GroupModel.findByIdAndUpdate(groupId, { $set: { name: name } });
      res
        .status(200)
        .send({
          status: "success",
          message: "Group name updated successfully",
        });
    } catch (error) {
      res
        .status(400)
        .send({ status: "failed", message: "Database Error", reason: error });
    }
  };

  // Method to update the status of a group (isActive field)
  static updateGroupStatus = async (req, res) => {
    const { status, groupId } = req.body;

    try {
      // Find the group and update its status
      await GroupModel.findByIdAndUpdate(groupId, {
        $set: { isActive: status },
      });
      res
        .status(200)
        .send({
          status: "success",
          message: "Group status updated successfully",
        });
    } catch (error) {
      res
        .status(400)
        .send({ status: "failed", message: "Database Error", reason: error });
    }
  };
}

export default UpdateGroup;
