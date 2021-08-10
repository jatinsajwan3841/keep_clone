import React from "react";
import Base from "./components/todo";
import Header from "./components/header";
import useStickyState from "./components/localState";

function App() {
    const [layout, setlayout] = useStickyState(true, "layout");
    const [darkMode, setDarkMode] = useStickyState(false, "darkMode");

    const lay = () => {
        layout ? setlayout(false) : setlayout(true);
    };

    return (
        <div className={`main ${darkMode && "darkMode"}`}>
            <Header
                layt={lay}
                layout={layout}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />
            <Base layout={layout} />
        </div>
    );
}

export default App;
