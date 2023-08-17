import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'groups' }]
})

userSchema.set("timestamps", true);

const UserModel = mongoose.model("users", userSchema);


export default UserModel