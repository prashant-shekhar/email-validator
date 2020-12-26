import React, { Component } from 'react'
import { connect } from "react-redux";
import User from './User'
import {userUpdateSuccess} from '../../redux/Admin/admin.actions'
class UserList extends Component {
    constructor(props){
        super(props)
        this.handleActivate=this.handleActivate.bind(this)
    }

    handleActivate(index,currentUser){

        if (confirm('Are you sure?')){
            currentUser['is_activated']=!currentUser['is_activated'];
            const token = document.querySelector("[name=csrf-token]").content;
            const admin_id = JSON.parse(localStorage.getItem("user"));
            const url = `/api/v1/users/${currentUser.id}`;
            const data = {
                admin_id: admin_id,
                is_activated: currentUser['is_activated'] ,
            };
            fetch(url, {
                method: "PUT",
                headers: {
                    "X-CSRF-Token": token,
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            }).then((result) => {
                result.json().then((resp) => {
                    if (resp.user) {
                        const message= currentUser['is_activated']?`${resp.user.name} is authorized to Bulk Upload`:`${resp.user.name} permission is restricted for bulk upload`;
                        swal("Accepted!",message,"success");
                        let updatedUsers= this.props.users;
                        updatedUsers[index]=currentUser; 
                        this.props.userUpdateSuccess(updatedUsers);
                    } else {
                        swal("Oops!",resp.errors[0],"error");
                    }
                });
            });    
        }
    }
    render() {
        const users = this.props.users;
        const allUsers = users.map((user, index) => (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                    <button className={"btn "+(user.is_activated?'btn-outline-danger':'btn-outline-success')} onClick={() => this.handleActivate(index,user)}>{user.is_activated?'Deactivate':'Activate'}</button>
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
        userUpdateSuccess: (payload) => dispatch(userUpdateSuccess(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);