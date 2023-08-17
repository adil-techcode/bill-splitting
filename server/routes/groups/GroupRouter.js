import express from "express";
var groupRouter = express.Router();

import GroupRegistration from "../../controllers/groups/GroupRegistration.js";
import GetGroups from "../../controllers/groups/GetGroups.js";
import UpdateGroup from "../../controllers/groups/UpdateGroup.js";
import Participant from "../../controllers/groups/Partcipant.js";

import checkUserAuth from "../../middlewares/authMiddleware.js";

groupRouter.post("/registration",  GroupRegistration.groupRegistration);
groupRouter.get("/users-group/:userId", checkUserAuth, GetGroups.userGroups);
groupRouter.post("/update-name", UpdateGroup.updateGroupName);
groupRouter.post("/update-status", UpdateGroup.updateGroupStatus);
groupRouter.post("/add-particiapnt", Participant.addParticiapnt);
groupRouter.post("/remove-particiapnt", Participant.removeParticipant);
groupRouter.get("/:groupId", GetGroups.getGroup);

export default groupRouter;
