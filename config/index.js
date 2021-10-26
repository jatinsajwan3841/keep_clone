import Mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

Mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = Mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting to MongoDB"));

db.once("open", function () {
    console.log("Connected to Database");
});

export default db;
