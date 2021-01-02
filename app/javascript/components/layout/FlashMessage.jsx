import React,{useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import {showSuccessAlert, showErrorAlert} from "../../redux/Alert/alert.actions";
const FlashMessage=()=> {
    const state=useSelector((state)=>state.alert)
    const dispatch= useDispatch() 
    const closeAlert=()=>{
            dispatch(showSuccessAlert({ successAlert: false, errorAlert:false}));
    }
    if (state.errorAlert){
            return (
                <div className="col-7 mx-auto my-auto">
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> You should check your username or password.
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                             <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )
    }
    else if(state.successAlert){
        return  (
            <div className="col-7 mx-auto my-auto">
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Login Successful!</strong> You Are successfully logged in.
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                             <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
        )
    }
    else{
        return(
            <>
            </>
        )
    }
}

export default FlashMessage;
