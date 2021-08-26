import React, { memo } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';

{/*Check user detail login with facebook*/}
const LoginWithFacebook = () => {

    const history = useHistory();

    const socialLogin = (response) => {
       
        if(typeof response.name != 'undefined'){
       
            if(typeof response.email !='undefined'){
                localStorage.setItem("emailId",response.email);
                var url = process.env.REACT_APP_API_URL+'/loginSocialMediaWithEmail';
                var userDetails = {
                    email: response.email ,
                    key: response.accessToken,
                    firstname: response.name,
                    SocialMediaType:response.graphDomain 
                }
            }else{
                var url = process.env.REACT_APP_API_URL+'/loginSocialMediaWithOutEmail';
                var userDetails = {
                    key:  response.accessToken,
                    firstname: response.name,
                    SocialMediaType:response.graphDomain 
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
                if(response.status == 200){
                  history.push("/dashboard");
                }
            }).catch((error) => {
                console.log(error.message);
            });
        }

    }

    const componentClicked = (data) => {
        console.log(data);
    }

    return(
        <a
            href="#"
            className="btn btn-info btn-block py-2 btn-google"
        >
        <i className="fa fa-facebook mr-2"></i>
        <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={socialLogin} 
        />
      </a>
    )
}

export default  memo(LoginWithFacebook);