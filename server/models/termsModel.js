import mongoose from "mongoose";

const termsSchema = new mongoose.Schema({
    content: String,
  });
  
  termsSchema.set("timestamps", true);
  const TermsModel = mongoose.model('Terms', termsSchema);

  export default TermsModel;