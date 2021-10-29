import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dp: { type: String },
    notes: [
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Notes",
        },
    ],
});

const User = Mongoose.model("User", UserSchema);
export default User;
