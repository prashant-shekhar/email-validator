import React, { Component } from 'react'
import { connect } from "react-redux";
import User from './User'
class UserList extends Component {
    constructor(){
        super()
    }

    handleActivate(id){
        console.log(id);
        if (confirm('Are you sure?')){
            //Database Update using routes
        }
    }
    render() {
        const users = this.props.users;
        console.log(users);
        const allUsers = users.map((user, index) => (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                    <button className={"btn "+(user.is_activated?'btn-outline-danger':'btn-outline-success')} onClick={() => this.handleActivate(user.id)}>{user.is_activated?'Deactivate':'Activate'}</button>
                </td>
            </tr>
        ));
        return (
            <div className="content">
                <h1>Users List</h1>  
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>{allUsers}</tbody>
                </table>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserSuccess: (payload) => dispatch(fetchUserSuccess(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);