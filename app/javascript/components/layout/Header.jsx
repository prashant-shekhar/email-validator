import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default () => (
    <nav className="navbar navbar-dark navbar-expand-md footer">
        <Link to="/" className="navbar-brand logo">
            Email Validator
        </Link>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsingNavbar3"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <Navbar />
    </nav>
);
