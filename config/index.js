import Mongoose from "mongoose";

Mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Notes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = Mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting to MongoDB"));

db.once("open", function () {
    console.log("Connected to Database");
});

export default db;
