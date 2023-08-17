// Import necessary models
import UserModel from "../../models/usersmodel.js";
import GroupModel from "../../models/groupmodel.js";
import ExpenseModel from "../../models/expensemodal.js";

// GetGroups class with static methods to retrieve groups and their details
class GetGroups {
  // Method to get all groups associated with a user
  static userGroups = async (req, res) => {
    const userId = req.params.userId;

    try {
      // Find the user by ID and populate their 'groups' field
      const user = await UserModel.findById(userId)
      .populate({
        path: 'groups',
        populate: {
          path: 'expenses',
          model: 'expenses',
        },
      });
      res
        .status(200)
        .send({
          status: "success",
          message: "Groups retrieved successfully",
          data: user.groups,
        });
    } catch (error) {
      res
        .status(500)
        .send({ status: "failed", message: "Database Error", reason: error });
    }
  };

  // Method to get a group and its expenses by group ID
  static getGroup = async (req, res) => {
    // const groupId = req.params.groupId;

    // try {
    //   // Find the group by ID and populate its 'expenses' field
    //   const group = await GroupModel.findById(groupId).populate("expenses");
    //   res
    //     .status(200)
    //     .send({
    //       status: "success",
    //       message: "Group details retrieved successfully",
    //       data: group,
    //     });
    // } catch (error) {
    //   res
    //     .status(500)
    //     .send({ status: "failed", message: "Database Error", reason: error });

    // }
 
    
    

    
    // const count = await UserModel.estimatedDocumentCount()
    try{

  
    
         // Calculate the date range for the last month
         const today = new Date();
         const sevenDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
         const fouteenDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14);
         const twentyoneDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 21);
         const twentyeightDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 28);
         console.log(twentyoneDaysAgo)
         console.log(fouteenDaysAgo)
             
         const time = [today,sevenDaysAgo,fouteenDaysAgo,twentyoneDaysAgo,twentyeightDaysAgo] 

         for(let i=0; i<time.length-1; i++){
          const documentCount = await UserModel.countDocuments({
            createdAt: { $gte: time[i+1].toISOString(), $lte: time[i].toISOString() },
          });
          console.log(documentCount)
         }
    // Query the database for groups created in the last month
 



    res.json("ok");
    
      
    }
    catch(error){
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }




  };

  

}

export default GetGroups;
