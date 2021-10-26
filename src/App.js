import React from "react";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Register from "./components/register";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/" exact component={Dashboard} />
        </BrowserRouter>
    );
}

export default App;
