import dotenv from "dotenv";
dotenv.config();
import Express from "express";
import cors from "cors";
import db from "./config/index.js";
import User from "./model/user.js";
import Notes from "./model/notes.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = Express();
const PORT = process.env.PORT;
app.use(
    Express.urlencoded({
        extended: true,
    })
);
app.use(Express.json());
app.use(cors());

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
        });
        res.status(200).send("User created successfully");
    } catch (err) {
        console.log(err);
        res.status(404).send({ error: "duplicate_email" });
    }
});

app.get("/api/notes", async (req, res) => {
    const token = req.headers["x-access-token"];
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;
        const user = await User.findOne({ email: email }).populate("notes");
        return res.status(200).send(user.notes);
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
        await User.findOneAndUpdate(
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const filter = { _id: req.query.id };
        const update = {
            value: req.body.note,
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

app.delete("/api/notes", (req, res) => {
    const token = req.headers["x-access-token"];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        Notes.deleteOne({ _id: req.query.id }, (err) => {
            if (err) {
                return res.status(500).send({ error: "not deleted" });
            }
            return res.status(200).send("deleted");
        });
    } catch (err) {
        console.log(err);
        return res.status(401).send({ error: "invalid token" });
    }
});

app.listen(PORT, () => console.log("listening on port", PORT));