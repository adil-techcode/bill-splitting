import express from "express";
const faqRouter = express.Router();

import Faqs from "../../controllers/faqs/Faqs.js";

faqRouter.get("/get",Faqs.getFaqs);
faqRouter.post("/post",Faqs.postfaq);
faqRouter.put("/update/:id",Faqs.updateFaq);
faqRouter.delete("/delete/:id",Faqs.deletefaq);


export default faqRouter;