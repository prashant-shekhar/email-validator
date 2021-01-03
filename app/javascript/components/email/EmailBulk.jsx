import React, { Component } from "react";
import { connect } from "react-redux";
import { createEmailSuccess } from "../../redux/Email/email.actions";

class EmailBulk extends Component {
    constructor() {
        super();
        this.state = {
            file: null,
            isUploading: false,
            isUploadSuccess: false,
            downloadLink: "#",
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        var pusher = new Pusher("6146ebbc681241f53074", {
            cluster: "ap2",
        });
        const user = JSON.parse(localStorage.getItem("user"));
        var channel = pusher.subscribe("my-channel");
        channel.bind(`my-event-${user.id}`, (response) => {
            console.log(response)
            this.setState({
                isUploading: false,
                isUploadSuccess: true,
                downloadLink: response.attachment.output_path,
            });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.file !== this.state.file) {
            this.setState({
                isUploading: false,
                isUploadSuccess: false,
                downloadLink: "#",
            });
        }
    }

    handleClick() {
        this.setState({ isUploading: true });
        const user = JSON.parse(localStorage.getItem("user"));
        const data = new FormData();
        data.append("csv_file", this.state.file);
        data.append("userid", user.id);
        const token = document.querySelector("[name=csrf-token]").content;
        let url = "/api/v1/uploads?type=csv";
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
            },
            body: data,
        }).then((result) => {
            result.json().then((resp) => {
                if (resp.error) {
                    swal("Oops!", resp.message, "error");
                }
            });
        });
    }

    render() {
        return (
            <div>
                <h1 className="display-4 font-monda">Bulk Email Verifier.</h1>
                <p className="text-muted mt-3 mb-4">
                    Use our system to remove invalid addresses from your list.
                    Keep your list clean to protect your deliverability and
                    reputation.
                </p>
                <div className="row">
                    <div className="col-8 mb-3">
                        <div className="custom-file">
                            <input
                                type="file"
                                className="custom-file-input form-control-lg"
                                id="customFile"
                                accept=".csv"
                                onChange={(e) => {
                                    this.setState({
                                        file: e.target.files[0],
                                    });
                                }}
                                disabled={
                                    (this.props.user &&
                                        !this.props.user.is_activated) ||
                                    this.state.isUploading
                                }
                            />
                            <label
                                className="custom-file-label col-form-label-lg"
                                htmlFor="customFile"
                            >
                                {this.state.file
                                    ? this.state.file.name
                                    : "Choose File"}
                            </label>
                        </div>
                        <div className="mt-2">
                            <span className="text-muted">
                                Please upload only csv
                            </span>
                            <a href="/Sample.csv"> Sample.csv</a>
                        </div>
                    </div>
                    <div className="col-4 mb-2">
                        {!this.state.isUploading &&
                            !this.state.isUploadSuccess && (
                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg w-100"
                                    onClick={this.handleClick}
                                    disabled={!this.state.file}
                                >
                                    Upload
                                </button>
                            )}
                        {this.state.isUploading && (
                            <i className="ml-5 justify-content-center fa fa-spinner fa-pulse fa-2x fa-fw"></i>
                        )}
                        {this.state.isUploadSuccess && (
                            <a
                                href={this.state.downloadLink}
                                className="w-100 btn btn-lg btn-primary active"
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
                {this.props.user && !this.props.user.is_activated && (
                    <div className="mt-3 alert alert-dark" role="alert">
                        Note: Please contact admin to unable this feature.
                    </div>
                )}
                <br />
                <br />
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailBulk);
