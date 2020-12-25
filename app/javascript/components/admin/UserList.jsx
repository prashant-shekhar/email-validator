import React, { Component } from 'react'

export default class UserList extends Component {
    componentDidMount(){
        const url ='/api/v1/users?user_id=23';
        fetch(url)
            .then((result) => {
                if (result.ok) {
                    result.json().then((response) => {
                        console.log(response);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
