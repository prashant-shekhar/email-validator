import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FlashMessage from "../layout/FlashMessage";
import {showAlert} from "../../redux/Alert/alert.actions"
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            email: "",
            password: "",
            confirm_password: "",
            has_role: "user",
            isLoading: false,
            errors: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.has_role == "admin") {
            this.state.has_role = this.props.has_role;
        }
        this.setState({ isLoading: true });
        const token = document.querySelector("[name=csrf-token]").content;
        if (this.validate()) {
            fetch("/api/v1/users", {
                method: "POST",
                headers: {
                    "X-CSRF-Token": token,
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify(this.state),
            }).then((result) => {
                this.setState({ isLoading: false });
                if (result.ok) {
                    result.json().then((resp) => {
                        const message =
                            this.props.has_role == "admin"
                                ? "New Admin Created Successfully"
                                : "You made it! Registration successfull, please login now";
                            const payload={
                                successAlert:true,
                                errorAlert:false,
                                strongMessage:"Success!",
                                message:message
                            }
                        this.props.showAlert(payload);
                        this.props.has_role == "admin"
                            ? this.props.redirectToAdmin()
                            : this.props.history.push("/login");
                    });
                } else {
                    result.json().then((resp) => {
                            const payload={
                                successAlert:false,
                                errorAlert:true,
                                strongMessage:"Error!",
                                message:resp.errors[0]
                            }
                        this.props.showAlert(payload)
                    });
                }
            });
        } else {
            this.setState({ isLoading: false });
        }
    }

    validate() {
        let isValid = true;
        let errors = {};

        if (this.state.name == "") {
            errors["name"] = "Name field is required";
            isValid = false;
        }

        if (this.state.username == "") {
            errors["username"] = "Username field is required";
            isValid = false;
        }
        if (this.state.email == "") {
            errors["email"] = "Email field is required";
            isValid = false;
        }
        if (this.state.password == "") {
            errors["password"] = "Password field is required";
            isValid = false;
        }

        if (this.state.password != this.state.confirm_password) {
            errors["confirm_password"] = "Password does not match";
            isValid = false;
        }

        this.setState({
            errors: errors,
        });
        return isValid;
    }
    render() {
        return (
            <div className="Login container mt-5">
                <FlashMessage />
                <div className="card col-7 mx-auto my-auto">
                    <h2 className="card-title text-center mt-4">
                        {this.props.has_role == "admin"
                            ? "Create New Admin"
                            : "Email Validator Register"}
                    </h2>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    onChange={(e) =>
                                        this.setState({ name: e.target.value })
                                    }
                                    required
                                />
                                <div className="text-danger">
                                    {this.state.errors.name}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Username"
                                    onChange={(e) =>
                                        this.setState({
                                            username: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <div className="text-danger">
                                    {this.state.errors.username}
                                </div>
                            </div>
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

                            <div className="form-group">
                                <label htmlFor="confirm_password">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    minLength="6"
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    onChange={(e) =>
                                        this.setState({
                                            confirm_password: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <div className="text-danger">
                                    {this.state.errors.confirm_password}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="form-control btn btn-primary"
                                disabled={this.state.isLoading}
                            >
                                {!this.state.isLoading ? (
                                    <span>Register</span>
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
                            {this.props.has_role != "admin" ? (
                                <div className="text-right mt-3 ">
                                    <small className="justify-content-end">
                                        Already Registered User?
                                        <Link to="login">Login Here</Link>
                                    </small>
                                </div>
                            ) : null}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        showAlert: (payload) => dispatch(showAlert(payload))
    };
};

export default connect(null, mapDispatchToProps)(Register)

export {Register}