import React from "react";
import { Link } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

export default () => (
    <div>
        <Header />
        <section>
            <div className="vh-100 primary-color d-flex align-items-center justify-content-center">
                <h1 className="display-4">Landing Page</h1>
            </div>
        </section>
        <Footer />
    </div>
);
