import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
    </Switch>
  </Router>
);
