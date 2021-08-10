import React from "react";
import "./comp.scss";
import {
    RiLayoutGridLine,
    RiLayoutRowLine,
    RiSunLine,
    RiSunFill,
} from "react-icons/ri";

export default function Header({ layt, layout, darkMode, setDarkMode }) {
    return (
        <header>
            <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" />
            <p>Keep clone</p>
            <div className="layoutBtn" onClick={() => layt()}>
                {layout ? <RiLayoutRowLine /> : <RiLayoutGridLine />}
            </div>
            <div className="layoutBtn" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <RiSunFill /> : <RiSunLine />}
            </div>
        </header>
    );
}
