import TermsModel from "../../models/termsModel.js";

class Terms {
  static get = async (req, res) => {
    try {
      const allTerms = await TermsModel.find();
      res.status(200).json({ status: "success", message: "Successful" , data : allTerms });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: "Database Error", reason: error });
    }
  };


  static postTerm =  async (req, res) => {
    const { content } = req.body; 
    try {
      const newTerms = new TermsModel({ content });
      await newTerms.save();
      res.status(200).json({ status: "success", message: "Successful" });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: "Database Error", reason: error });
    }
  };

  // API to update Terms and Conditions
static updateTerm =  async (req, res) => {
    const { content } = req.body;
    const { id } = req.params; 
    try {
      const updatedTerms = await TermsModel.findByIdAndUpdate(id, { content }, { new: true });
      res.status(200).json({ status: "success", message: "Successful" });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: "Database Error", reason: error });
    }
  };

 static deleteTerm=  async (req, res) => {
    const { id } = req.params; 
    try {
      await TermsModel.findByIdAndDelete(id);
      res.status(200).json({ status: "success", message: "Successful" });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: "Database Error", reason: error });
    }
  };

}


export default Terms
