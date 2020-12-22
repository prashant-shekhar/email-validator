import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const renderList = () => {
    const isLoggedIn = localStorage.getItem("jwt");
    const history = useHistory();
    useEffect(() => {
        if (isLoggedIn) {
            history.push("/dashboard");
        } else {
            history.push("/");
        }
    }, []);
    if (isLoggedIn) {
        return [
            <li key="nav-logout" className="nav-item">
                <button
                        onClick={() => {
                            localStorage.clear();
                            history.push("/login");
                        }}
                        className="btn waves-light bg-white logout-btn"
                    >
                        Logout
                </button>
            </li>,
        ];
    } else {
        return [
            <li key="nav-login" className="nav-item active">
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </li>,
            <li key="nav-register" className="nav-item">
                <Link className="nav-link" to="/register">
                    Register
                </Link>
            </li>,
        ];
    }
};

export default () => (
    <div className="navbar-collapse collapse" id="collapsingNavbar3">
        <ul className="navbar-nav ml-auto w-100 justify-content-end">
            {renderList()}
        </ul>
    </div>
);
