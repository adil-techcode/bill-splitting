import express from "express";
var adminRouter = express.Router();
import Statistics from "../../controllers/admin/statistics.js";
import verifyAdmin from "../../middlewares/adminVerifyMiddleware.js";


adminRouter.get("/getcount",verifyAdmin, Statistics.getCount);


export default adminRouter;