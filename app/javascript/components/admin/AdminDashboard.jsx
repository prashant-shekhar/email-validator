import React, { Component } from 'react'
import { connect } from "react-redux";
import {fetchUserSuccess} from '../../redux/Admin/admin.actions'
import UserList from './UserList';
class AdminDashboard extends Component {
   constructor(props){
       super(props)
   }
   componentDidMount(){
        const url ='/api/v1/users?user_id=23';
        fetch(url)
            .then((result) => {
                if (result.ok) {
                    result.json().then((response) => {
                        this.props.fetchUserSuccess(response)
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    render() {
        return (
            <div className="container">
            <div className="row">
                <div className="col-sm">
                    <UserList />
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);