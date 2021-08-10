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
});

const Notes = Mongoose.model("Notes", notesSchema);

export default Notes;
