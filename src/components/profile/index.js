import React from "react";
import { useHistory } from "react-router-dom";
import { LoadContext } from "../context";
import "../login/index.scss";

const Profile = ({ user, handleProfile, setUser }) => {
    const [dp, setDp] = React.useState("false");
    let history = useHistory();
    const { setLoading } = React.useContext(LoadContext);
    const handleDp = async (e) => {
        let tdp = e.target.files[0];
        if (tdp && tdp.size < 2000000) {
            const reader = new FileReader();
            reader.onload = (re) => {
                let temp = btoa(re.target.result);
                setDp(temp);
            };
            reader.readAsBinaryString(tdp);
        } else {
            alert("please choose file of size less than 2MB!");
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const name = e.target.name.value;
        let pass = e.target.password.value;
        if (pass === "") {
            pass = false;
        }
        let res = await fetch(`${process.env.REACT_APP_BASE_URL + "/update"}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
                name: name,
                password: pass,
                dp: dp,
            }),
        });
        setLoading(false);
        if (res.status === 200) {
            alert("yay! successfully updated!");
            setUser([name, user[1], dp]);
            handleProfile();
            if (pass) {
                localStorage.removeItem("token");
                history.replace("/login");
            }
        } else {
            alert("Something went wrong");
        }
    };
    React.useEffect(() => {
        setDp(user[2]);
    }, []);
    return (
        <div className="login-container">
            <h3 className="start">
                Here's your profile <span className="high">╰(*°▽°*)╯</span>{" "}
            </h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <div className="avatar">
                        {dp !== "false" && (
                            <img
                                className="dp"
                                alt="dp"
                                src={`data:image/jpeg;base64,${dp}`}
                            />
                        )}
                        <span className="upload" />
                    </div>
                    <input
                        type="file"
                        name="dp"
                        accept=".jpeg, .jpg,.png"
                        onChange={handleDp}
                    />
                </label>
                <div className="inp-content">
                    <label htmlFor="name" className="label">
                        Your name
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder=" "
                        defaultValue={user[0]}
                        minLength="3"
                        required
                    />
                    <hr className="border-bottom" />
                    <span className="placeholder">name</span>
                </div>
                <div className="inp-content">
                    <label htmlFor="email" className="label">
                        Your email
                    </label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={user[1]}
                        disabled
                        required
                    />
                    <hr className="border-bottom" />
                    <span className="placeholder">email</span>
                </div>
                <div className="inp-content">
                    <label htmlFor="password" className="label">
                        Changing password will log you out!
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder=" "
                        minLength="6"
                    />
                    <hr className="border-bottom" />
                    <span className="placeholder">password</span>
                </div>
                <center>
                    <input
                        type="submit"
                        value="Update"
                        className="form-button"
                    />
                </center>
                <div className="link" onClick={handleProfile}>
                    Click here to go back!
                </div>
            </form>
        </div>
    );
};

export default Profile;
