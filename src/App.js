import React from "react";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Register from "./components/register";
import { HashRouter as Router, Route } from "react-router-dom";

function App() {
    return (
        <Router basename="/keep_clone">
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/" exact component={Dashboard} />
        </Router>
    );
}

export default App;
