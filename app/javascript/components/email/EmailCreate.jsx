import React, { Component } from "react";
import { connect } from "react-redux";
import { createEmailSuccess } from "../../redux/Email/email.actions";

class EmailCreate extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            errors: {},
            file: "",
            isLoading: false,
            isUploading: false,
            isUploadSuccess: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.file !== this.state.file) {
            this.setState({ isUploading: true, isUploadSuccess: false });
            const data = new FormData();
            data.append("file", this.state.file);
            this.handleFetchRequest(data);
        }
    }

    handleFetchRequest(data) {
        const token = document.querySelector("[name=csrf-token]").content;
        const url = "/api/v1/emails";
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((result) => {
            this.setState({ isUploading: false });
            result.json().then((resp) => {
                if (resp) {
                    swal(
                        "Good job!",
                        "Email is validated successfully",
                        "success"
                    );
                    const email = this.state.email;
                    this.props.createEmailSuccess({ email });
                } else {
                    swal(
                        "Oops!",
                        "You must try with another email address",
                        "error"
                    );
                }
                this.setState({ email: "", errors: {}, isLoading: false });
            });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        this.setState({ isLoading: true });
        if (this.validate()) {
            const data = {
                email: this.state.email,
                userid: user.id,
            };
            this.handleFetchRequest(data);
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
            <div className="card shadow p-2 mb-5 bg-white rounded-lg">
                <div className="card-body">
                    <h6 className="card-subtitle mb-2">Validate Email</h6>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-8 mb-4">
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
                            <div className="col-4 mb-4">
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
                    <h6 className="card-subtitle mb-2">
                        Validate Multiple Emails
                    </h6>
                    <div className="row">
                        <div className="col-8 mb-2">
                            <div className="custom-file">
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    id="customFile"
                                    accept=".csv"
                                    onChange={(e) => {
                                        this.setState({
                                            file: e.target.files[0],
                                        });
                                    }}
                                    disabled={this.state.isUploading}
                                />
                                <label
                                    className="custom-file-label"
                                    htmlFor="customFile"
                                >
                                    {this.state.file
                                        ? this.state.file.name
                                        : "Choose File"}
                                </label>
                            </div>
                            <div className="mt-2">
                                <span>Please upload only csv</span>
                                <a href="#"> Sample.csv</a>
                            </div>
                        </div>
                        <div className="col-4 mb-2">
                            {this.state.isUploading && (
                                <i className="ml-5 justify-content-center fa fa-spinner fa-pulse fa-2x fa-fw"></i>
                            )}
                            {this.state.isUploadSuccess && (
                                <a
                                    href="#"
                                    className="w-100 btn btn-primary active"
                                    role="button"
                                    aria-pressed="true"
                                >
                                    <i
                                        className="fa fa-download"
                                        aria-hidden="true"
                                    ></i>{" "}
                                    Download
                                </a>
                            )}
                        </div>
                    </div>
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
