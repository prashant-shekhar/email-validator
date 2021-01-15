import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAttachmentSuccess } from "../../redux/Attachment/attachment.actions";

class EmailBulkList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        const url = `/api/v1/uploads?userid=${user.id}`;
        fetch(url)
            .then((result) => {
                if (result.ok) {
                    result.json().then((response) => {
                        this.props.fetchAttachmentSuccess(response);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const attachments = this.props.attachments;
        const allAttachments = attachments.map((attachment, index) => (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{attachment.file_name}</td>
                <td>
                    <a href={attachment.output_path} aria-pressed="true">
                        <i
                            className="fa fa-download fa-lg"
                            aria-hidden="true"
                        ></i>
                    </a>
                </td>
                <td>{new Date(attachment.created_at).toDateString()}</td>
            </tr>
        ));
        return (
            <div className="mt-3">
                <h4 className="font-monda mt-3 mb-2">
                    Your's Validated CSV List
                </h4>
                {attachments.length ? (
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">File</th>
                                    <th scope="col">Download</th>
                                    <th scope="col">Added</th>
                                </tr>
                            </thead>
                            <tbody>{allAttachments}</tbody>
                        </table>
                    </div>
                ) : (
                    <h6 className="m-3">
                        Email List is empty. Why not upload one?
                    </h6>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        attachments: state.attachment.attachments,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAttachmentSuccess: (payload) =>
            dispatch(fetchAttachmentSuccess(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailBulkList);

export { EmailBulkList };
