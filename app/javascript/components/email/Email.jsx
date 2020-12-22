import React, { useEffect } from "react";
import EmailCreate from "./EmailCreate";
import EmailList from "./EmailList";

const Email = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <EmailList />
                </div>
                <div className="col-sm">
                    <EmailCreate />
                </div>
            </div>
        </div>
    );
};

export default Email;
