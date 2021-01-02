import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../redux/User/user.actions";
import GLogin from "./GLogin";
import FlashMessage from "../layout/FlashMessage";
import {showSuccessAlert,showErrorAlert} from "../../redux/Alert/alert.actions"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLoading: false,
            errors: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.onSuccessfulGoogleLogin=this.onSuccessfulGoogleLogin.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props);
        this.setState({ isLoading: true });
        const token = document.querySelector("[name=csrf-token]").content;
        if (this.validate()) {
            fetch("/api/v1/users/login", {
                method: "POST",
                headers: {
                    "X-CSRF-Token": token,
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify(this.state),
            }).then((result) => {
                this.setState({ isLoading: false });
                if(result.ok){
                    result.json().then((resp)=>{
                        localStorage.setItem("jwt", JSON.stringify(resp.jwt));
                        localStorage.setItem("user", JSON.stringify(resp.user));
                        const payload = {
                            token: resp.jwt,
                            user: resp.user,
                            isLoggedIn: true,
                        };
                        this.props.loginUser(payload);
                    })
                }
                else{
                    result.json().then(resp=>{
                        const payload={
                            successAlert: false,
                            errorAlert: true
                        }
                        this.props.showErrorAlert(payload)
                    })
                }
            });
        } else {
            this.setState({ isLoading: false });
        }
    }

    validate() {
        let isValid = true;
        let errors = {};

        if (this.state.email == "") {
            errors["email"] = "Email field in required";
            isValid = false;
        }
        if (this.state.password == "") {
            errors["password"] = "Password field is required";
            isValid = false;
        }

        this.setState({
            errors: errors,
        });
        return isValid;
    }

    onSuccessfulGoogleLogin(payload,payload1){
        this.props.loginUser(payload)
        this.props.showSuccessAlert(payload1)
    }
    render() {
        return (
            <div className="Login container mt-5">
                <FlashMessage />
                <div className="card col-7 mx-auto my-auto">
                    <h2 className="card-title text-center mt-4">
                        Email Validator Login
                    </h2>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    onChange={(e) =>
                                        this.setState({ email: e.target.value })
                                    }
                                    required
                                />
                                <small className="form-text text-muted">
                                    We'll never share your email with anyone
                                    else.
                                </small>
                                <div className="text-danger">
                                    {this.state.errors.email}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    minLength="6"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    onChange={(e) =>
                                        this.setState({
                                            password: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <div className="text-danger">
                                    {this.state.errors.password}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="form-control btn btn-primary"
                                disabled={this.state.isLoading}
                            >
                                {!this.state.isLoading ? (
                                    <span>Login</span>
                                ) : (
                                    <div
                                        className="spinner-border text-light spinner-border-sm"
                                        role="status"
                                    >
                                        <span className="sr-only">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                            </button>
                            <div className="text-right mt-3 ">
                                <small className="justify-content-end">
                                    New User?{" "}
                                    <Link to="register">Register Here</Link>{" "}
                                </small>
                            </div>
                        </form>
                    </div>
                    <GLogin onSuccessfulLogin={this.onSuccessfulGoogleLogin}/>
                </div>
                {this.props.isLoggedIn && this.props.user.has_role == "user" ? (
                    <Redirect to="/dashboard"></Redirect>
                ) : null}
                {this.props.isLoggedIn &&
                this.props.user.has_role == "admin" ? (
                    <Redirect to="/admindashboard"></Redirect>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        user: state.user.user,
        isLoggedIn: state.user.isLoggedIn,
        successAlert: state.alert.successAlert,
        errorAlert: state.alert.errorAlert
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (payload) => dispatch(loginUser(payload)),
        showSuccessAlert: (payload) => dispatch(showSuccessAlert(payload)),
        showErrorAlert: (payload) => dispatch(showErrorAlert(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

export {Login}