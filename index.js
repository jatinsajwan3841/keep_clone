import Express from "express";
import cors from "cors";
import db from "./config/index.js";
import Notes from "./model/index.js";

const app = Express();
const PORT = process.env.PORT || 7000;
app.use(
    Express.urlencoded({
        extended: true,
    })
);
app.use(Express.json());
app.use(cors());

app.get("/", (req, res) => {
    Notes.find({}, (err, task) => {
        if (err) {
            console.log("Error in fetching tasks from db");
            return;
        }

        return res.send(task);
    });
});

app.post("/create-task", (req, res) => {
    Notes.create(
        {
            value: req.body.value,
            date: req.body.date,
        },
        (err, newtask) => {
            if (err) {
                console.log("error in creating task", err);
                return;
            }
            return res.send(newtask);
        }
    );
});

app.put("/update", (req, res) => {
    const filter = { _id: req.query.id };
    const update = { isCompleted: req.query.isCompleted };
    Notes.updateOne(filter, update, { upsert: true }, (err, changed) => {
        console.log(err, changed);
    });
});

app.delete("/delete-task", (req, res) => {
    let id = req.query.id;
    Notes.deleteOne({ _id: id }, (err) => {
        console.log(err);
    });
    return res.send("check");
});

app.listen(PORT, () => console.log("listening on port", PORT));
