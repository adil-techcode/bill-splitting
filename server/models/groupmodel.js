import mongoose from "mongoose";

const groupSchema=  new mongoose.Schema({

    name: { type: String, required: true, trim: true },
    creatorId : {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    isActive : { type: Boolean, required: true},
    participants: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId, required: true , ref : 'users' },
          name: { type: String, required: true },
          email: { type: String, required: true },
        },
      ],
      expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'expenses' }]
})

groupSchema.set("timestamps", true);

const GroupModel =  mongoose.model("groups",groupSchema);

export default GroupModel;