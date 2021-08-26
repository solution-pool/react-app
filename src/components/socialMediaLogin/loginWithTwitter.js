import React, { memo } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import TwitterLogin from "react-twitter-login";

const LoginWithTwitter = () => {

    const history = useHistory();

    {/*Check user detail login with Twitter*/}
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
        console.log(userDetails);
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

    const authHandler = (err, data) => {
        console.log(err, data);
    };


    return (
        <a
            href="#"
            className="btn btn-info btn-block py-2 btn-google"
        >
            <i className="fa fa-twitter-f mr-2"></i>
            <TwitterLogin
                authCallback={authHandler}
                consumerKey={process.env.TWITTER_KEY}
                consumerSecret={process.env.TWITTER_SECRET}
            />
        </a>
    )
}

export default memo(LoginWithTwitter);