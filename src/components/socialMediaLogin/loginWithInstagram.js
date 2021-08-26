import React, { memo } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import InstagramLogin from 'react-instagram-login';

const LoginWithInstagram = () => {

    const history = useHistory();

    {/*Check user detail login with Instagram*/}
    const socialLogin = (response) => {
        if (response.email != '') {
            localStorage.setItem("emailId", response.email);
            var url = process.env.REACT_APP_API_URL + '/loginSocialMediaWithEmail';
            var userDetails = {
                email: response.email,
                key: response.accessToken,
                firstname: response.name,
                SocialMediaType: response.graphDomain
            }
        } else {
            var url = process.env.REACT_APP_API_URL + '/loginSocialMediaWithOutEmail';
            var userDetails = {
                key: typeof response.accessToken,
                firstname: typeof response.name,
                SocialMediaType: response.graphDomain
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
        }).catch((error) => {
            console.log(error.message);
        });

    }

    const responseInstagram = (response) => {
        console.log(response);
    }

    return (
        <a
            href="#"
            className="btn btn-info btn-block py-2 btn-google"
        >
            <InstagramLogin
                clientId={process.env.REACT_APP_INSTAGRAM_CLIENT_ID}
                buttonText="Login"
                onSuccess={responseInstagram}
                onFailure={responseInstagram}
            >
                <i class="fa fa-instagram"></i>
                <span> Login with Instagram</span>
            </InstagramLogin>
        </a>
    )
}

export default memo(LoginWithInstagram);