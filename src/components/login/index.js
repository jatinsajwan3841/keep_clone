import React from "react";
import { useHistory, Link } from "react-router-dom";

const Login = () => {
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
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
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Please enter your Email: </label>
                <input type="email" name="email" placeholder="Email" required />
                <br />

                <label htmlFor="password">Please enter your password: </label>
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    required
                />
                <br />
                <input type="submit" value="Login" />
                <Link to="/register">
                    <button>Click here to register</button>
                </Link>
            </form>
        </div>
    );
};

export default Login;
