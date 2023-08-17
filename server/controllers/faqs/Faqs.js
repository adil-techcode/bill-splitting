import FaqModel from "../../models/faqmodel.js";

class Faqs  {

    static getFaqs = async (req, res) => {
        try {
          const faqs = await FaqModel.find();
          res.status(200).json({ status: "success", message: "Successful" , data : faqs });
        } catch (error) {
            return res.status(500).json({ status: "failed", message: "Database Error", reason: error });
        }
      };
    
    
      static postfaq =  async (req, res) => {
          const { ques,ans } = req.body; 
          console.log(ques)
        try {
          const newfaq = new FaqModel({ 
            question : ques,
            answer : ans
           });
          await newfaq.save();
          res.status(200).json({ status: "success", message: "Successful" });
        } catch (error) {
            return res.status(500).json({ status: "failed", message: "Database Error", reason: error });
        }
      };
    
      // API to update Terms and Conditions
    static updateFaq =  async (req, res) => {
        const { ques,ans } = req.body;
        const { id } = req.params; 
        try {
            const updateObj = { question: ques, answer: ans };
          const updatedfaq = await FaqModel.findByIdAndUpdate(id,updateObj , { new: true });
          res.status(200).json({ status: "success", message: "Successful" });
        } catch (error) {
            return res.status(500).json({ status: "failed", message: "Database Error", reason: error });
        }
      };
    
     static deletefaq =  async (req, res) => {
        const { id } = req.params; 
        try {
          await FaqModel.findByIdAndDelete(id);
          res.status(200).json({ status: "success", message: "Successful" });
        } catch (error) {
            return res.status(500).json({ status: "failed", message: "Database Error", reason: error });
        }
      };

}


export default Faqs;