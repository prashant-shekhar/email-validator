import React, { Component } from "react";

class EmailCreate extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            errors: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.validate()) {
            console.log(this.state);
            fetch("URL", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify(this.state),
            }).then((result) => {
                result.json().then((resp) => {});
            });
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
                                    className="btn btn-primary"
                                >
                                    Validate
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default EmailCreate;
