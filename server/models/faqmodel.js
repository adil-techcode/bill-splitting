import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
  });

  
  faqSchema.set("timestamps", true);
  const FaqModel = mongoose.model('Faq', faqSchema);

  export default FaqModel;