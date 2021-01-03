import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEmailSuccess } from "../../redux/Email/email.actions";

class EmailList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        const url = `/api/v1/emails?userid=${user.id}`;
        fetch(url)
            .then((result) => {
                if (result.ok) {
                    result.json().then((response) => {
                        this.props.fetchEmailSuccess(response);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const emails = this.props.emails;
        const allEmails = emails.map((emailEle, index) => (
            <li key={index} className="list-group-item">
                {emailEle.email}
            </li>
        ));
        const noEmail = (
            <h6 className="m-3">No email yet. Why not create one</h6>
        );
        return (
            <div className="mt-3">
                <h4 className="font-monda mt-3 mb-2">
                    Your's Validated Emails List
                </h4>
                <div className="card mt-2 mb-5 bg-white rounded-lg scrollable">
                    <div className="card-header bg-primary text-white">
                        <span className="badge badge-light mr-2">
                            {emails.length}
                        </span>
                        <span>Validated Email List</span>
                    </div>
                    <ul className="list-group list-group-flush scrollable">
                        {emails.length > 0 ? allEmails : noEmail}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        emails: state.email.emails
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEmailSuccess: (payload) => dispatch(fetchEmailSuccess(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailList);

export {EmailList}