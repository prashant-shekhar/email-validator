import React, { Component } from "react";
import { connect } from "react-redux";
import { createEmailSuccess } from "../../redux/Email/email.actions";

class EmailCreate extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            errors: {},
            file: null,
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
            const user = JSON.parse(localStorage.getItem("user"));
            const data = new FormData();
            data.append("file", this.state.file);
            data.append("userid", user.id)
            this.handleFetchRequest(data, true);
        }
    }

    handleFetchRequest(data, type = false) {
        const token = document.querySelector("[name=csrf-token]").content;
        let url = "/api/v1/emails";
        console.log(type)
        if(type) url+="?type=csv"
        console.log(url)
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
            },
            body: data,
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
                    let isPresent =
                        this.props.emails.filter((i) => email == i.email)
                            .length > 0
                            ? true
                            : false;
                    if (!isPresent) {
                        this.props.createEmailSuccess({ email });
                    }
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
            <div className="mb-3">
                <h1 className="display-4 font-monda">Email Validator.</h1>
                <div className="display-4 font-monda">Easy, Fast & Free.</div>
                <p className="text-muted mt-3 mb-4">
                    Email Validator will clean your mailing list and increase
                    deliverability rate up to 99%. The email address validation
                    process was never so easy.
                </p>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-8 mb-4">
                            <label htmlFor="email" className="input-lg sr-only">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                onChange={(e) =>
                                    this.setState({ email: e.target.value })
                                }
                                value={this.state.email}
                                placeholder="Email email to verify now ..."
                                required
                            />
                            <div className="text-danger">
                                {this.state.errors.email}
                            </div>
                        </div>
                        <div className="col-4 mb-4">
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-100"
                                disabled={this.state.isLoading}
                            >
                                {!this.state.isLoading ? (
                                    <span>Validate Mail</span>
                                ) : (
                                    <i className="fa fa-spinner fa-pulse fa-1x fa-fw"></i>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        emails: state.email.emails,
        user: state.user.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createEmailSuccess: (payload) => dispatch(createEmailSuccess(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailCreate);
