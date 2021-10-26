import Mongoose from "mongoose";

const notesSchema = new Mongoose.Schema({
    value: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    date: { type: Date, default: Date.now },
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Notes = Mongoose.model("Notes", notesSchema);

export default Notes;
