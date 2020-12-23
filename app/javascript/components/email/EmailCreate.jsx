import React, { Component } from "react";
import { connect } from "react-redux";
import { createEmailSuccess } from "../../redux/Email/email.actions";

class EmailCreate extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            errors: {},
            isLoading: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.setState = this.setState.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        this.setState({ isLoading: true });
        if (this.validate()) {
            const token = document.querySelector("[name=csrf-token]").content;
            const url = "/api/v1/emails";
            const data = {
                email: this.state.email,
                userid: user.id,
            };
            fetch(url, {
                method: "POST",
                headers: {
                    "X-CSRF-Token": token,
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            }).then((result) => {
                result.json().then((resp) => {
                    resp
                        ? swal(
                              "Good job!",
                              "Email is validated successfully",
                              "success"
                          )
                        : swal(
                              "Oops!",
                              "You must try with another email address",
                              "warning"
                          );
                    const email = this.state.email;
                    this.props.createEmailSuccess({ email });
                    this.setState({ email: "", errors: {}, isLoading: false });
                });
            });
        } else {
            this.setState({ isLoading: false });
        }
    }

    validate() {
        let isValid = true;
        let errors = {};
        var email = this.state.email;
        if (email == "") {
            errors["email"] = "Email field in required";
            isValid = false;
        }
        if (
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                email
            )
        ) {
            errors["email"] = "You have entered an invalid email address!";
            isValid = false;
        }

        this.setState({
            errors: errors,
        });
        return isValid;
    }

    render() {
        return (
            <div className="card shadow p-3 mb-5 bg-white rounded-lg">
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-8 mb-2">
                                <label htmlFor="email" className="sr-only">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    onChange={(e) =>
                                        this.setState({ email: e.target.value })
                                    }
                                    value={this.state.email}
                                    placeholder="Email Address"
                                    required
                                />
                                <div className="text-danger">
                                    {this.state.errors.email}
                                </div>
                            </div>
                            <div className="col-4 mb-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={this.state.isLoading}
                                >
                                    {!this.state.isLoading ? (
                                        <span>validate</span>
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
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        emails: state.email.emails,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createEmailSuccess: (payload) => dispatch(createEmailSuccess(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailCreate);
