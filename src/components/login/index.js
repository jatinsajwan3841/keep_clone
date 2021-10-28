import React from "react";
import { useHistory, Link } from "react-router-dom";
import { LoadContext } from "../context";
import "./index.scss";

const Login = () => {
    let history = useHistory();
    const { setLoading } = React.useContext(LoadContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const email = e.target.email.value;
        const pass = e.target.password.value;
        let res = await fetch(`${process.env.REACT_APP_BASE_URL + "/login"}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: pass }),
        });
        if (res.status === 200) {
            let response = await res.json();
            localStorage.setItem("token", response.user);
            history.push("/");
        } else {
            setLoading(false);
            alert("wrong username or password");
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
            <h3 className="start">
                Let's set go <span className="high">╰(*°▽°*)╯</span>{" "}
            </h3>
            <div className="avatar" />
            <form onSubmit={handleSubmit}>
                <div className="inp-content">
                    <label htmlFor="email" className="label">
                        Please enter your email
                    </label>
                    <input type="email" name="email" placeholder=" " required />
                    <hr className="border-bottom" />
                    <span className="placeholder">email</span>
                </div>
                <div className="inp-content">
                    <label htmlFor="password" className="label">
                        Please enter your password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder=" "
                        minLength="6"
                        required
                    />
                    <hr className="border-bottom" />
                    <span className="placeholder">password</span>
                </div>
                <center>
                    <input
                        type="submit"
                        value="Login"
                        className="form-button"
                    />
                </center>
                <Link to="/register" className="link">
                    Click here to register
                </Link>
            </form>
        </div>
    );
};

export default Login;
