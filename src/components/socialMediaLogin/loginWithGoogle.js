import React, { memo } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';


const LoginWithGoogle = () => {
    const history = useHistory();
 

    {/*Check user detail login with Google*/}
    const socialLogin = (response) => {
        if (typeof response.profileObj != 'undefined') {
            if (response.profileObj.email != '') {
                localStorage.setItem("emailId", response.profileObj.email)

                var url = process.env.REACT_APP_API_URL+'/loginSocialMediaWithEmail';

                var userDetails = {
                    email: response.profileObj.email,
                    key: response.profileObj.googleId,
                    firstname: response.profileObj.name,
                    SocialMediaType: 'google'
                }
            } else {
                var url = process.env.REACT_APP_API_URL+'/loginSocialMediaWithOutEmail';

                var userDetails = {
                    key: response.profileObj.googleId,
                    firstname: response.profileObj.name,
                    SocialMediaType: 'google'
                }
            }
            axios.post(
                url,
                userDetails,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                if (response.status == 200) {
                    history.push("/dashboard");
                }
            })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    }
    
    
    return (
        <a
            href="#"
            className="btn btn-info btn-block py-2 btn-google"
        >
            <i className="fa fa-google mr-2"></i>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={socialLogin}
                onFailure={socialLogin}
                cookiePolicy={'single_host_origin'}
            />
        </a>
    )
}

export default memo(LoginWithGoogle);