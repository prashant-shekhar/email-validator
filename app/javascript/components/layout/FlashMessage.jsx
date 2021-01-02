import React,{useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import {hideAlert} from "../../redux/Alert/alert.actions";
const FlashMessage=()=> {
    const state=useSelector((state)=>state.alert)
    const dispatch= useDispatch() 
    const closeAlert=()=>{
            dispatch(hideAlert());
    }
    useEffect(() => {
        if(state.successAlert||state.errorAlert){
            setTimeout(()=> {
                    dispatch(hideAlert());
                },
                5000
            );
        }
    },[state.successAlert,state.errorAlert])
    if (state.errorAlert){
            return (
                <div className="col-7 mx-auto my-auto">
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>{state.strongMessage}</strong> {" "+state.message}
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
                        <strong>{state.strongMessage}</strong> {" "+state.message}
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
