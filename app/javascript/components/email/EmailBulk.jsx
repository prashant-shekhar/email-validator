import React, { Component } from "react";
import { connect } from "react-redux";
import { createAttachmentSuccess } from "../../redux/Attachment/attachment.actions";
import {showAlert} from "../../redux/Alert/alert.actions"

class EmailBulk extends Component {
    constructor() {
        super();
        this.state = {
            file: null,
            isUploading: false,
            isUploadSuccess: false,
            downloadLink: "#",
            isError: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.validateFile = this.validateFile.bind(this);
    }

    componentWillMount() {
        var pusher = new Pusher("6146ebbc681241f53074", {
            cluster: "ap2",
        });
        const user = JSON.parse(localStorage.getItem("user"));
        var channel = pusher.subscribe("my-channel");
        channel.bind(`my-event-${user.id}`, (response) => {
            this.setState({
                isUploading: false,
                isUploadSuccess: true,
                downloadLink: response.attachment.output_path,
            });
            let attachment = response.attachment;
            this.props.createAttachmentSuccess({ attachment });
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
        this.setState({ isUploading: true, isError: false });
        this.validateFile().then((response) => {
            if (response) {
                const jwtToken = localStorage.getItem("jwt")
                const user = JSON.parse(localStorage.getItem("user"));
                const data = new FormData();
                data.append("csv_file", this.state.file);
                data.append("userid", user.id);
                const token = document.querySelector("[name=csrf-token]")
                    .content;
                let url = "/api/v1/uploads?type=csv";
                fetch(url, {
                    method: "POST",
                    headers: {
                        "X-CSRF-Token": token,
                        Authorization: jwtToken,
                    },
                    body: data,
                }).then((result) => {
                    result.json().then((resp) => {
                        if (resp.error) {
                            this.setState({isUploading: false})
                            const payload={
                                successAlert: false,
                                errorAlert: true,
                                strongMessage: "Error!",
                                message: resp.message
    
                            }
                            this.props.showAlert(payload)
                        }
                    });
                });
            } else {
                this.setState({ isUploading: false, isError: true });
            }
        });
    }

    async validateFile() {
        let allKeyPresent = false;
        let Papa = require("papaparse/papaparse.min.js");
        let promise = new Promise((resolve, reject) => {
            Papa.parse(this.state.file, {
                header: true,
                step: (row, parser) => {
                    if (!allKeyPresent) {
                        parser.pause();
                        let first_row_data = row.data;
                        if (
                            "Email" in first_row_data &&
                            Object.keys(first_row_data).length == 1
                        ) {
                            allKeyPresent = true;
                        }
                    }
                    parser.abort();
                    resolve(allKeyPresent);
                },
            });
        });
        let result = await promise;
        return result;
    }

    downloadhandleclick = () => {
        this.setState({
            isUploading: false,
            isUploadSuccess: false,
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
                        {this.state.isError && (
                            <div className="mt-2">
                                <div className="row ml-2">
                                    <img
                                        className="d-block"
                                        src="/invalid.svg"
                                    />
                                    <strong className="ml-1">
                                        Invalid File
                                    </strong>
                                </div>
                                <span className="text-muted ml-2">
                                    Please check file format. It should be same
                                    as Sample.csv
                                </span>
                            </div>
                        )}
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
                                onClick = {this.downloadhandleclick}
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
        createAttachmentSuccess: (payload) => dispatch(createAttachmentSuccess(payload)),
        showAlert: (payload) => dispatch(showAlert(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailBulk);
