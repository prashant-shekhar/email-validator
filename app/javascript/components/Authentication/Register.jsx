import React, { Component } from 'react'

import { Link } from "react-router-dom";

export default class Register extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            username:'',
            email:'',
            password:'',
            confirm_password:'',
            errors:{}
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.validate=this.validate.bind(this);
    }
 
    handleSubmit(e){
        e.preventDefault();
        if(this.validate()){  
            // console.log('workign');
                fetch('URL',{
                    method:"POST",
                    headers:{
                        "Accept":"application/json",
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify(this.state)
                }).then((result)=>{
                    result.json().then((resp)=>{
                        console.log(resp.token)
                        //Save Token to storage and Login user
                    })
                })
        }
        
    }

    validate(){
        let isValid=true;
        let errors={}

        if(this.state.name==''){
            errors['name']="Name can't be empty"
            isValid=false
        }

        if(this.state.username==''){
            errors['username']="Username can't be empty"
            isValid=false
        }
        if(this.state.email==''){
            errors['email']="Email can't be empty"
            isValid=false
        }
        if(this.state.password==''){
            errors['password']=" can't be empty"
            isValid=false
        }

        if(this.state.password!=this.state.confirm_password){
            errors["confirm_password"]='Password does not match'
            isValid=false
        }

        this.setState({
            errors:errors
        })
        return isValid
    }
    render() {
        return (
        <div className="Login container mt-5">
            <div className="card col-7 mx-auto my-auto">
                <h2 className="card-title text-center mt-4">Email Validator Register</h2>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit} >
                    <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" placeholder="Enter Name" onChange={(e)=>this.setState({name:e.target.value})} required/>
                            <div className="text-danger">{this.state.errors.name}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" placeholder="Enter Username" onChange={(e)=>this.setState({username:e.target.value})} required/>
                            <div className="text-danger">{this.state.errors.username}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" placeholder="Enter Email" onChange={(e)=>this.setState({email:e.target.value})} required/>
                            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                            <div className="text-danger">{this.state.errors.email}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" minLength="6" className="form-control" placeholder="Enter Password" onChange={(e)=>this.setState({password:e.target.value})} required/>
                            <div className="text-danger">{this.state.errors.password}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input type="password" minLength="6" className="form-control" placeholder="Confirm Password" onChange={(e)=>this.setState({confirm_password:e.target.value})} required/>
                            <div className="text-danger">{this.state.errors.confirm_password}</div>
                        </div>
                       <input type="submit" className="form-control btn btn-primary" value="Register"/>
                       <div className="text-right mt-3 ">
                            <small className="justify-content-end">Already Registered User?  <Link to="login">Login Here</Link> </small>
                        </div>
                    </form>
                </div>
            </div>
      </div>
        )
    }
}
