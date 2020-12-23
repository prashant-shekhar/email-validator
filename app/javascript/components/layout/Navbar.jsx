import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import { loginUser, logoutUser} from "../../redux/User/user.actions";

const Navbar = () => {

    const renderList = () => {
        const isUser = localStorage.getItem("jwt");
        const state = useSelector(state => state.user)
        const dispatch = useDispatch()
        const history = useHistory();
        console.log(state)
        useEffect(() => {
            if (state.isLoggedIn) {
                history.push("/dashboard");
            }
            else if(isUser){
                const user = localStorage.getItem("user")
                dispatch(loginUser({token: isUser, user: user, isLoggedIn:true}))
                history.push("/dashboard")
            } else {
                history.push("/");
            }
        }, []);
        if (state.isLoggedIn) {
            return [
                <li key="nav-logout" className="nav-item">
                    <button
                            onClick={() => {
                                localStorage.clear();
                                dispatch(logoutUser())
                                history.push("/login")
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

    return (
        <div className="navbar-collapse collapse" id="collapsingNavbar3">
            <ul className="navbar-nav ml-auto w-100 justify-content-end">
                {renderList()}
            </ul>
        </div>
    )
}
export default Navbar;
