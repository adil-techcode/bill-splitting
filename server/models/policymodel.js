import mongoose from "mongoose";

const policySchema = new mongoose.Schema({
    content: String,
  });
  
  policySchema.set("timestamps", true);
  const PolicyModel = mongoose.model('Policy', policySchema);

  export default PolicyModel;