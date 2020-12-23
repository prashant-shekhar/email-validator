import React from "react";
import { Provider } from "react-redux";
import Routes from "../routes/Index";
import Store from "../redux/store";

export default (props) => (
    <>
        <Provider store={Store}>{Routes}</Provider>
    </>
);
