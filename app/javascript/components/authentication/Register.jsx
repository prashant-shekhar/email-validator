import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            email: "",
            password: "",
            confirm_password: "",
            errors: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
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
                if (result.ok) {
                    result.json().then((resp) => {
                        swal(
                            "Good job!",
                            "You made it! Registration successfull, please login now",
                            "success"
                        );
                        this.props.history.push("/login");
                    });
                } else {
                    result.json().then((resp) => {
                        swal("Oops", resp.errors[0], "error");
                    });
                }
            });
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
                <div className="card col-7 mx-auto my-auto">
                    <h2 className="card-title text-center mt-4">
                        Email Validator Register
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
                            <input
                                type="submit"
                                className="form-control btn btn-primary"
                                value="Register"
                            />
                            <div className="text-right mt-3 ">
                                <small className="justify-content-end">
                                    Already Registered User?{" "}
                                    <Link to="login">Login Here</Link>
                                </small>
                                <small className="justify-content-end">
                                    Already Registered User?{" USER"}
                                    <Link to="admindashboard">Login Here</Link>
                                </small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
