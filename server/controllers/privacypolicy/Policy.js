import PolicyModel from "../../models/policymodel.js";

class Policy {

  static getPolicies = async (req, res) => {
    try {
      const allTerms = await PolicyModel.find();
      res.status(200).json({ status: "success", message: "Successful" , data : allTerms });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: "Database Error", reason: error });
    }
  };


  static postPolicy =  async (req, res) => {
    const { content } = req.body; 
    try {
      const newTerms = new PolicyModel({ content });
      await newTerms.save();
      res.status(200).json({ status: "success", message: "Successful" });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: "Database Error", reason: error });
    }
  };

  // API to update Terms and Conditions
static updatePolicy =  async (req, res) => {
    const { content } = req.body;
    const { id } = req.params; 
    try {
      const updatedTerms = await PolicyModel.findByIdAndUpdate(id, { content }, { new: true });
      res.status(200).json({ status: "success", message: "Successful" });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: "Database Error", reason: error });
    }
  };

 static deletePolicy =  async (req, res) => {
    const { id } = req.params; 
    try {
      await PolicyModel.findByIdAndDelete(id);
      res.status(200).json({ status: "success", message: "Successful" });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: "Database Error", reason: error });
    }
  };

}


export default Policy
