import React, { Component } from 'react'
import Register from '../authentication/Register'
export default class CreateAdmin extends Component {
    constructor(props){
        super(props);
        this.redirect=this.redirect.bind(this);
    }

    redirect(){
        this.props.history.push('/admindashboard')
    }
    render() {
        return (
            <>
                <Register redirectToAdmin={this.redirect} has_role="admin"/>
            </>
        )
    }
}
