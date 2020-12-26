import React, { Component } from 'react'
import { connect } from "react-redux";
import {fetchUserSuccess} from '../../redux/Admin/admin.actions'
import Stats from './Stats';
import UserList from './UserList';
class AdminDashboard extends Component {
   constructor(props){
       super(props)
   }
   componentDidMount(){
        const url ='/api/v1/users?user_id=17';
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
            <div className="col-10">
                <Stats totalUsers={this.props.users.length} totalActivatedUsers={this.props.users.filter(user=>(user.is_activated===true)).length}/>
                <UserList />
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