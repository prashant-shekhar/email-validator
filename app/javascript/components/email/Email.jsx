import React, { useEffect } from "react";
import EmailCreate from "./EmailCreate";
import EmailList from "./EmailList";

const Email = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 col-6">
                    <EmailCreate />
                    <EmailList />
                </div>
                <div className="col-sm-6 col-6">
                    <img className="d-block w-100" src="/header_main-page.svg"></img>
                </div>
            </div>
        </div>
    );
};

export default Email;
