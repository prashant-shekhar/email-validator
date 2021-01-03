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
                        console.log(response)
                        this.props.fetchAttachmentSuccess(response);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="mt-3">
                <h4 className="font-monda mt-3 mb-2">
                    Your's Validated CSV List
                </h4>
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
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>
                                    <a
                                        href="#"
                                        aria-pressed="true"
                                    >
                                        <i
                                            className="fa fa-download fa-lg"
                                            aria-hidden="true"
                                        ></i>
                                    </a> 
                                </td>
                                <td>@mdo</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        attachments: state.email.attachments
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAttachmentSuccess: (payload) => dispatch(fetchAttachmentSuccess(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailBulkList);

export { EmailBulkList };
