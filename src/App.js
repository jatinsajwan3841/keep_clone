import Base from "./components/todo";
import Header from "./components/header";
import React from "react";

function App() {
    const [layout, setlayout] = React.useState(true);
    const [darkMode, setDarkMode] = React.useState(false);

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
