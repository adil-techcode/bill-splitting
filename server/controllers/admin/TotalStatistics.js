import UserModel from "../../models/usersmodel.js"
import ExpenseModel from "../../models/expensemodal.js"
import GroupModel from "../../models/groupmodel.js"

class totalStatistics {

static totalUsers  = async (req,res) => {
  
    try{
        const count = await UserModel.estimatedDocumentCount()
        return count;
    }
    catch(error){

        res.status(500).send({ status: "failed", message: "Database Error", reason: error });
    }

} 

static totalGroups  = async(req,res) => {

    try{
        const count = await GroupModel.estimatedDocumentCount()
        return count;
    }
    catch(error){

        res.status(500).send({ status: "failed", message: "Database Error", reason: error });
    }

    
} 

static totalExpenses  = async(req,res) => {

    try{
        const count = await ExpenseModel.estimatedDocumentCount()
        return count;
    }
    catch(error){
        res.status(500).send({ status: "failed", message: "Database Error", reason: error });
    }
    
} 

}


 export default totalStatistics