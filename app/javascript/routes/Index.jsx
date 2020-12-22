import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";
import Email from "../components/email/Index";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default (
    <Router>
        <Header />
        <div>
            <section>
                <div className="primary-color d-flex mt-5 align-items-center justify-content-center">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/dashboard" exact component={Email} />
                    </Switch>
                </div>
            </section>
        </div>
        <Footer />
    </Router>
);
