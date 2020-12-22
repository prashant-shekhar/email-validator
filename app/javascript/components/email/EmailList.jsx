import React, { Component } from "react";

class EmailList extends Component {
    constructor(props) {
        super();
        this.state = {
            emails: [],
        };
    }

    componentDidMount() {
        const url = `/api/v1/emails/index?userid=${'1'}`;
        fetch(url)
            .then((result) => {
                if(result.ok){
                result.json().then((response) => {
                    this.setState({emails: response})
                });
                }else{

                }
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    render() {
        const { emails } = this.state;
        const allEmails = emails.map((emailEle, index) => (
                <li key={index} className="list-group-item">
                    {emailEle.email}
                </li>
        ));
        const noEmail = (
            <h6 className="m-3">No email yet. Why not create one</h6>
        );
        return (
            <div className="card shadow mb-5 bg-white rounded-lg">
                <div className="card-header bg-primary text-white">
                    Validated Email List
                </div>
                <ul className="list-group list-group-flush scrollable">
                    {emails.length > 0 ? allEmails : noEmail}
                </ul>
            </div>
        );
    }
}

export default EmailList;
