import dotenv from "dotenv";
dotenv.config();
import Express from "express";
import cors from "cors";
import Mongoose from "mongoose";
import db from "./config/index.js";
import User from "./model/user.js";
import Notes from "./model/notes.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const corsOptions = {
    origin: process.env.CORES_ORIGIN,
    optionsSuccessStatus: 200,
};
const app = Express();
const PORT = process.env.PORT;
app.use(
    Express.urlencoded({
        extended: true,
    })
);
app.use(Express.json({ limit: "3mb" }));
app.use(cors(corsOptions));
app.options("*", cors());

app.post("/api/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send({ error: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (isPasswordValid) {
        const token = jwt.sign(
            { name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        return res.status(200).send({ user: token });
    } else {
        return res.status(404).send({ user: false });
    }
});

app.post("/api/register", async (req, res) => {
    try {
        const saltRound = 10;
        const hashedPass = await bcrypt.hash(req.body.password, saltRound);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            dp: req.body.dp,
        });
        res.status(200).send("User created successfully");
    } catch (err) {
        console.log(err);
        res.status(404).send({ error: "duplicate_email" });
    }
});

app.put("/api/update", async (req, res) => {
    const token = req.headers["x-access-token"];
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;
        const updatedName = req.body.name;
        const updatedPass = req.body.password;
        const updatedDp = req.body.dp;
        if (updatedPass) {
            const saltRound = 10;
            const hashedPass = await bcrypt.hash(updatedPass, saltRound);
            let res = await User.updateOne(
                { email: email },
                { name: updatedName, password: hashedPass, dp: updatedDp }
            );
        } else {
            let res = await User.updateOne(
                { email: email },
                { name: updatedName, dp: updatedDp }
            );
        }
        res.status(200).send("updated");
    } catch (err) {
        console.log(err);
        res.status(500).send("Sorry could not update");
    }
});

app.get("/api/notes", async (req, res) => {
    const token = req.headers["x-access-token"];
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;
        const user = await User.findOne({ email: email }).populate("notes");
        return res
            .status(200)
            .send([user.notes, user.name, user.email, user.dp]);
    } catch (err) {
        console.log(err);
        return res.status(401).send({ error: "invalid token" });
    }
});

app.post("/api/notes", async (req, res) => {
    const token = req.headers["x-access-token"];
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;
        const user = await User.findOne({ email: email });
        const newNote = await Notes.create({
            value: req.body.value,
            user: user._id,
        });
        await User.updateOne(
            { email: email },
            { $push: { notes: newNote._id } }
        );
        res.status(200).send(newNote);
    } catch (err) {
        console.log(err);
        res.status(404).send({
            error: "Either unAuthenticated or something went wrong",
        });
    }
});

app.put("/api/notes", async (req, res) => {
    const token = req.headers["x-access-token"];
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const filter = { _id: req.query.id };
        const update = {
            value: req.body.value,
            isCompleted: req.query.isCompleted,
        };
        Notes.updateOne(filter, update, { upsert: true }, (err, changed) => {
            if (err) {
                return res.status(500).send({ error: "internal server error" });
            }
            return res.status(200).send("updated");
        });
    } catch (err) {
        console.log(err);
        return res.status(401).send({ error: "invalid token" });
    }
});

app.delete("/api/notes", async (req, res) => {
    const token = req.headers["x-access-token"];
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;
        Notes.deleteOne({ _id: req.query.id }, (err) => {
            if (err) {
                return res.status(500).send({ error: "not deleted" });
            }
            return res.status(200).send("deleted");
        });
        await User.updateOne(
            { email: email },
            { $pull: { notes: Mongoose.Types.ObjectId(req.query.id) } }
        );
    } catch (err) {
        console.log(err);
        return res.status(401).send({ error: "invalid token" });
    }
});

app.listen(PORT, () => console.log("listening on port", PORT));
