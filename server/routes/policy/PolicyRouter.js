import express from "express";
const policyRouter = express.Router();
import Policy from "../../controllers/privacypolicy/policy.js";


policyRouter.get("/get",Policy.getPolicies);
policyRouter.post("/post",Policy.postPolicy);
policyRouter.put("/update/:id",Policy.updatePolicy);
policyRouter.delete("/delete/:id",Policy.deletePolicy);


export default policyRouter;