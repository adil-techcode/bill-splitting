import mongoose from "mongoose";

const  adminSchema = new mongoose.Schema({
   name :{type: String , required : true, trim: true},
   email :{type: String , required : true, trim: true},
   password :{type: String , required : true, trim: true},
    time :{type: String , required : true, trim: true},
    role :{type: String , required : true, trim: true}
})


const AdminModel = mongoose.model("admins",adminSchema);


export default AdminModel