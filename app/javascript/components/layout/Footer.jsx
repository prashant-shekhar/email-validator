import React from "react";
import { Link } from "react-router-dom";

export default () => (
    <div className="mt-5 pt-5 pb-5 footer">
        <div className="container">
            <div className="row">
                <div className="col-lg-5 col-xs-12 about-company">
                    <h2>Email Validator</h2>
                    <p className="pr-5 text-white-50">
                        Validate Your Email List Quickly and Easily.{" "}
                    </p>
                </div>
                <div className="col-lg-3 col-xs-12 links">
                    <h4 className="mt-lg-0 mt-sm-3">Social</h4>
                    <ul className="m-0 p-0">
                        <li>
                            <a href="https://github.com/nikhilbhatt/EmailValidator">
                                GitHub<i className="fab fa-github"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-4 col-xs-12 location">
                    <h4 className="mt-lg-0 mt-sm-4">Contact Us</h4>
                    <p>
                        eLitmus Evaluation Private Limited L-29, 2nd Floor, 2nd
                        'A' Main, 6th sector, HSR Layout, Bangalore-560102
                    </p>
                    <p>query@elitmus.com</p>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col copyright">
                    <p className="">
                        <small className="text-white-50">
                            © 2020. All Rights Reserved.
                        </small>
                    </p>
                </div>
            </div>
        </div>
    </div>
);
