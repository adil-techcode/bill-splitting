import mongoose from "mongoose";

const expenseSchema=  new mongoose.Schema({

    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    paidBy: { type: String, required: true, trim: true },
    groupId : {type: mongoose.Schema.Types.ObjectId, ref: 'groups'},
    totalAmount : { type: String, required: true, trim: true },
    perHead: { type: String, required: true, trim: true },
    currency: { type: String, required: true, trim: true },
    participants: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId, required: true , ref : 'users' },
          name: { type: String, required: true },
          email: { type: String, required: true },
          perHead: { type: String, required: true }
        },
      ]
     
})

expenseSchema.set("timestamps", true);

const ExpenseModel =  mongoose.model("expenses",expenseSchema);

export default ExpenseModel;