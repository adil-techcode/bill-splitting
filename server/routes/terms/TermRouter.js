import express from "express";
const termRouter = express.Router();
import Terms from "../../controllers/terms/Terms.js";


termRouter.get("/get",Terms.get);
termRouter.post("/post",Terms.postTerm);
termRouter.put("/update/:id",Terms.updateTerm);
termRouter.delete("/delete/:id",Terms.deleteTerm);


export default termRouter;