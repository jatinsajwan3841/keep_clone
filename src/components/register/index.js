import React from "react";
import { useHistory, Link } from "react-router-dom";

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
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Please enter your Name: </label>
                <input type="text" name="name" placeholder="Name" required />
                <br />

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
                <input type="submit" value="Register" />
                <Link to="/login">
                    <button>Click here to login</button>
                </Link>
            </form>
        </div>
    );
};

export default Register;
