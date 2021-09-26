import React from "react";
import "./comp.scss";
import { MdDelete } from "react-icons/md";

const Base = ({ layout }) => {
    const [todo, settodo] = React.useState("");
    const [todoList, settodoList] = React.useState([]);
    const [expand, setexpand] = React.useState(false);

    const handleVal = (e) => settodo(e.target.value);

    const handlexpand = () => setexpand(true);

    const handleAdd = async () => {
        if (todo != "") {
            let details = {
                value: todo,
            };
            settodoList([...todoList, details]);
            details = JSON.stringify(details);
            let send = await fetch(
                "https://keep-clone41.herokuapp.com/create-task",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: details,
                }
            );
            settodo("");
            setexpand(false);
        } else setexpand(false);
    };

    const handleDelete = async (id) => {
        await settodoList(todoList.filter((t) => t._id != id));
        await fetch(`https://keep-clone41.herokuapp.com/delete-task?id=${id}`, {
            method: "DELETE",
        });
    };

    const handleCompleted = async (id) => {
        //find index of that array object
        const element = todoList.findIndex((elem) => elem._id === id);
        //copy array into new variable using spread op.
        const newtodoList = [...todoList];
        //edit that element
        newtodoList[element] = {
            ...newtodoList[element],
            isCompleted: true,
        };

        await settodoList(newtodoList);
        await fetch(
            `https://keep-clone41.herokuapp.com/update?id=${id}&isCompleted=${true}`,
            {
                method: "PUT",
            }
        );
    };

    React.useEffect(() => {
        const init = async () => {
            let res = await fetch("https://keep-clone41.herokuapp.com", {
                method: "GET",
                mode: "cors",
            });
            res = await res.json();
            await settodoList(res);
        };
        init();
    }, []);

    return (
        <>
            <form>
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
                            <div className={`textarea ${!layout && "f"}`}>
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
        </>
    );
};

export default Base;
