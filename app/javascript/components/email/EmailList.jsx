import React, { Component } from "react";

class EmailList extends Component {
    constructor(props) {
        super();
        this.state = {
            emails: [],
        };
    }

    componentDidMount() {
        const url = "/api/v1/emails/index";
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((response) => this.setState({ recipes: response }))
            .catch(() => this.props.history.push("/"));
    }

    render() {
        const { emails } = this.state;
        const allEmails = emails.map((email, index) => (
            <ul className="list-group list-group-flush scrollable">
                <li key={index} className="list-group-item">
                    {email}
                </li>
            </ul>
        ));
        const noEmail = (
            <h6 className="m-3">No email yet. Why not create one</h6>
        );
        return (
            <div className="card shadow mb-5 bg-white rounded-lg">
                <div className="card-header bg-primary text-white">
                    Validated Email List
                </div>
                {emails.length > 0 ? allEmails : noEmail}
            </div>
        );
    }
}

export default EmailList;
