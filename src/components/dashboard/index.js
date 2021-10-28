import React from "react";
import Header from "../header";
import useStickyState from "../localState";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import "./index.scss";
import { MdDelete } from "react-icons/md";

const Dashboard = () => {
    const [todo, settodo] = React.useState("");
    const [todoList, settodoList] = React.useState([]);
    const [expand, setexpand] = React.useState(false);
    const [layout, setlayout] = useStickyState(true, "layout");
    const [darkMode, setDarkMode] = useStickyState(false, "dark-mode");
    const history = useHistory();

    const lay = () => {
        setlayout((prev) => !prev);
    };

    const handleVal = (e) => settodo(e.target.value);

    const handlexpand = () => setexpand(true);

    const handleAdd = async () => {
        if (todo != "") {
            let details = {
                value: todo,
            };
            let send = await fetch(
                `${process.env.REACT_APP_BASE_URL + "/notes"}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": localStorage.getItem("token"),
                    },
                    body: JSON.stringify(details),
                }
            );
            if (send.status === 200) {
                details = await send.json();
                settodoList([...todoList, details]);
                settodo("");
                setexpand(false);
            } else {
                alert("something went wrong, try again!");
            }
        } else setexpand(false);
    };

    const handleDelete = async (id) => {
        let res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/notes?id=${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token"),
                },
            }
        );
        if (res.status === 200) {
            settodoList(todoList.filter((t) => t._id != id));
        } else {
            alert("something went wrong");
        }
    };

    const handleCompleted = async (id) => {
        //find index of that array object
        const element = todoList.findIndex((elem) => elem._id === id);
        //copy array into new variable using spread op.
        const newtodoList = [...todoList];
        //edit that element
        let temp = newtodoList[element].isCompleted;
        let res = await fetch(
            `${
                process.env.REACT_APP_BASE_URL
            }/notes?id=${id}&isCompleted=${!temp}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ value: newtodoList[element].value }),
            }
        );
        if (res.status === 200) {
            newtodoList[element] = {
                ...newtodoList[element],
                isCompleted: !temp,
            };

            settodoList(newtodoList);
        } else {
            alert("something went wrong");
        }
    };

    React.useEffect(() => {
        const init = async (token) => {
            let res = await fetch(
                `${process.env.REACT_APP_BASE_URL + "/notes"}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": token,
                    },
                }
            );
            if (res.status === 200) {
                res = await res.json();
                await settodoList(res);
            } else if (res.status === 401) {
                localStorage.removeItem("token");
                alert("relogin again");
                history.replace("/login");
            }
        };
        const token = localStorage.getItem("token");
        if (token) {
            const user = jwt.decode(token);
            if (!user) {
                localStorage.removeItem("token");
                history.replace("/login");
            } else {
                init(token);
            }
        } else {
            history.replace("/login");
        }
    }, []);

    return (
        <div className={`main ${darkMode && "darkMode"}`}>
            <Header
                layt={lay}
                layout={layout}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                history={history}
            />
            <form className="addNote">
                <textarea
                    rows={expand ? 3 : 1}
                    value={todo}
                    onClick={handlexpand}
                    onChange={handleVal}
                    onBlur={handleAdd}
                    placeholder="Take your note..."
                />
            </form>

            {todoList != [] ? (
                <ul className={`container ${!layout && "f"}`}>
                    {todoList.map((t) => (
                        <li
                            key={t._id}
                            className={`noteholder ${!layout && "f"}`}
                        >
                            <div className={`note-text ${!layout && "f"}`}>
                                <span className={t.isCompleted && "cross"}>
                                    {t.value}
                                </span>
                                <span className="tools">
                                    <span className="date">
                                        {`${new Date(t.date).toLocaleString()}`}
                                    </span>
                                    <button
                                        className="btn"
                                        onClick={() => handleDelete(t._id)}
                                    >
                                        <MdDelete />
                                    </button>
                                    <input
                                        className="btn"
                                        type="checkbox"
                                        id="completed"
                                        onClick={() => handleCompleted(t._id)}
                                    />
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default Dashboard;
