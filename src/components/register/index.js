import React from "react";
import { useHistory, Link } from "react-router-dom";
import "../login/index.scss";

const Register = () => {
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.email.value;
        const email = e.target.email.value;
        const pass = e.target.password.value;
        let res = await fetch(
            `${process.env.REACT_APP_BASE_URL + "/register"}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: pass,
                }),
            }
        );
        if (res.status === 200) {
            history.push("/login");
        } else {
            alert("user already exist");
        }
    };
    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            history.replace("/");
        }
    }, []);
    return (
        <div className="login-container">
            <div className="avatar" />
            <form onSubmit={handleSubmit}>
                <div className="inp-content">
                    <label htmlFor="name" className="label">
                        Please enter your name
                    </label>
                    <input type="text" name="name" required />
                    <hr className="border-bottom" />
                    <span className="placeholder">name</span>
                </div>
                <div className="inp-content">
                    <label htmlFor="email" className="label">
                        Please enter your email
                    </label>
                    <input type="email" name="email" required />
                    <hr className="border-bottom" />
                    <span className="placeholder">email</span>
                </div>
                <div className="inp-content">
                    <label htmlFor="password" className="label">
                        Please enter your password
                    </label>
                    <input type="password" name="password" required />
                    <hr className="border-bottom" />
                    <span className="placeholder">password</span>
                </div>
                <center>
                    <input
                        type="submit"
                        value="Register"
                        className="form-button"
                    />
                </center>
                <Link to="/login" className="link">
                    Click here to login
                </Link>
            </form>
        </div>
    );
};

export default Register;
