import React from "react";
import "./index.scss";
import {
    RiLayoutGridLine,
    RiLayoutRowLine,
    RiSunLine,
    RiSunFill,
    RiLogoutCircleRLine,
} from "react-icons/ri";

const Header = ({
    layt,
    layout,
    darkMode,
    setDarkMode,
    history,
    dp,
    handleProfile,
}) => {
    return (
        <header className="header">
            <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" />
            <p className="KC">Keep clone</p>
            <div className="layoutBtn" onClick={handleProfile}>
                {dp !== "false" ? (
                    <img
                        className="dp"
                        alt="dp"
                        src={`data:image/jpeg;base64,${dp}`}
                    />
                ) : (
                    <div className="dp" />
                )}
            </div>

            <div className="layoutBtn" onClick={() => layt()}>
                {layout ? <RiLayoutRowLine /> : <RiLayoutGridLine />}
            </div>
            <div className="layoutBtn" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <RiSunFill /> : <RiSunLine />}
            </div>
            <div
                className="layoutBtn"
                onClick={() => {
                    localStorage.removeItem("token");
                    history.push("/login");
                }}
            >
                <RiLogoutCircleRLine />
            </div>
        </header>
    );
};

export default Header;
