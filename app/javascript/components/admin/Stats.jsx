import React, { Component } from 'react'

export default class Stats extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="row ">
                <div className="col-sm-12 col-lg-4">
                    <div className="card shadow p-3 mb-5 bg-white rounded h-100">
                        <div className="card-body">
                            <h5 className="card-title text-center">Total Users</h5>
                            <h2 className="card-text text-center">{this.props.totalUsers}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-lg-4">
                    <div className="card shadow p-3 mb-5 bg-white rounded h-100">
                        <div className="card-body">
                            <h5 className="card-title text-center">User With CSV Permission</h5>
                            <h2 className="card-text text-center">{this.props.totalActivatedUsers}</h2>
                    </div>
                    </div>
                </div>
                <div className="col-sm-12 col-lg-4">
                    <div className="card shadow p-3 mb-5 bg-white rounded h-100">
                        <div className="card-body">
                            <h5 className="card-title text-center">User Without CSV Permission</h5>
                            <h2 className="card-text text-center">{this.props.totalUsers-this.props.totalActivatedUsers}</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
