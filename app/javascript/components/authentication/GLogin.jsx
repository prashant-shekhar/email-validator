import React, { useState }  from 'react'
import { GoogleLogin } from 'react-google-login'
const clientId= '208036174903-fd45r47f86esi12v4svr9037uf5irj3v.apps.googleusercontent.com'

 const GLogin = (props) =>{ 
    const [showSpinner,setShowSpinner]=useState(false);
    
    const onSuccess= (res) =>{

        setShowSpinner(true)
        let data={
            access_token:res.tokenObj.access_token,
            email:res.profileObj.email,
        }
        const token = document.querySelector("[name=csrf-token]").content;
        fetch('/api/v1/users/check', {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((result) => {
            result.json().then((resp) => {
                if(!resp.error){
                    console.log(resp);
                    localStorage.setItem("jwt", JSON.stringify(resp.jwt));
                    localStorage.setItem("user", JSON.stringify(resp.user));
                    const payload = {
                        token: resp.jwt,
                        user: resp.user,
                        isLoggedIn: true,
                    };
                    props.onSuccessfulLogin(payload)
                }
                else{
                    swal("Error!","something went wrong, please try again", "failure");
                }
                setShowSpinner(false)   
            });
        });
    }
    const onFailure = (res) => {
        swal("Error!","something went wrong, please try again", "failure");
    }
        return (
            <div className="text-center text-dark mb-4">
                <GoogleLogin
                    clientId="208036174903-fd45r47f86esi12v4svr9037uf5irj3v.apps.googleusercontent.com"
                    buttonText ="Sign In with Google"
                    onSuccess={onSuccess}
                    onFailure ={onFailure}
                    cookiePolicy={'single_host_origin'}
                >
                {!showSpinner ? (
                                    <span>Login With Google</span>
                                ) : (
                                    <div
                                        className="spinner-border text-primary spinner-border-sm"
                                        role="status"
                                    >
                                        <span className="sr-only">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                </GoogleLogin>
            </div>
        )
    }


export default GLogin;