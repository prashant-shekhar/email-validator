import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../redux/User/user.actions";

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
    }

    handleSubmit(e) {
        e.preventDefault();
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
                result.json().then((resp) => {
                    if (resp.error) {
                        swal("Oops!", resp.message, "error");
                    } else {
                        localStorage.setItem("jwt", JSON.stringify(resp.jwt));
                        localStorage.setItem("user", JSON.stringify(resp.user));
                        swal(
                            "Good job!",
                            "You made it! Sign in successfull",
                            "success"
                        );
                        const payload = {
                            token: resp.jwt,
                            user: resp.user,
                            isLoggedIn: true,
                        };
                        this.props.loginUser(payload);
                    }
                });
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
    render() {
        return (
            <div className="Login container mt-5">
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
                </div>
                {this.props.isLoggedIn ? (
                    <Redirect to="/dashboard"></Redirect>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (payload) => dispatch(loginUser(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
