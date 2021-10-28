import React from "react";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Register from "./components/register";
import { LoadContext } from "./components/context";
import Loading from "./components/loading";
import { HashRouter as Router, Route } from "react-router-dom";

function App() {
    const [loading, setLoading] = React.useState(false);
    return (
        <LoadContext.Provider value={{ setLoading }}>
            {loading && <Loading />}
            <Router basename="/keep_clone">
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/" exact component={Dashboard} />
            </Router>
        </LoadContext.Provider>
    );
}

export default App;
