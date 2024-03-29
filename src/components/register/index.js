import React from "react";
import { useHistory, Link } from "react-router-dom";
import { LoadContext } from "../context";
import "../login/index.scss";

const Register = () => {
    const [dp, setDp] = React.useState(false);
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
                    dp: dp,
                }),
            }
        );
        setLoading(false);
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
            <h3 className="start">
                Let's get started <span className="high">╰(*°▽°*)╯</span>{" "}
            </h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <div className="avatar">
                        {dp && (
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
                        Please enter your name
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder=" "
                        minLength="3"
                        required
                    />
                    <hr className="border-bottom" />
                    <span className="placeholder">name</span>
                </div>
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
