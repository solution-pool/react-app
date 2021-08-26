import React, { useEffect, useState } from "react";
import "./../../../../App.css";
import axios from "axios";

const UserProfileSecurity = () => {
  const [emailPrivacy, setEmailPrivacy] = useState(false);
  const [phonePrivacy, setPhonePrivacy] = useState(false);
  const [frientReqPrivacy, setFriendReqPrivacy] = useState(false);
  const [callApi,setCallApi] = useState(0);
  
  const privacyInfo = (type) => {
   alert(emailPrivacy);
    if(type === 'email'){
        setEmailPrivacy(!emailPrivacy);
    }
    if(type === 'phone_no'){
        setPhonePrivacy(!phonePrivacy);
    }
    if(type === 'friend_req'){
        setFriendReqPrivacy(!frientReqPrivacy);
    }

    // axios
    //   .post(
    //     process.env.REACT_APP_API_URL + `/security`,
    //     {
    //       user_id: localStorage.getItem("userId"),
    //       email_is_public: emailPrivacy ? 1 : 0,
    //       phone_is_public: phonePrivacy ? 1 : 0,
    //       friend_request_is_public: frientReqPrivacy ? 1 : 0,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     setCallApi(callApi+1)

    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => 
    axios
      .post(
        process.env.REACT_APP_API_URL + `/security`,
        {
          user_id: localStorage.getItem("userId"),
          email_is_public: emailPrivacy ? 1 : 0,
          phone_is_public: phonePrivacy ? 1 : 0,
          friend_request_is_public: frientReqPrivacy ? 1 : 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setCallApi(callApi+1)

      })
      .catch((error) => {
        console.log(error.message);
      }),
    2000)
    // return () => clearTimeout(timeoutId);
  }, [emailPrivacy,phonePrivacy,frientReqPrivacy]);
  useEffect(()=>{
    axios
      .post(
        process.env.REACT_APP_API_URL + `/getAllUser`,
        {
          user_id: localStorage.getItem("userId"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setEmailPrivacy(response.data.User[0].email_is_public)
        setPhonePrivacy(response.data.User[0].phone_is_public);
        setFriendReqPrivacy(response.data.User[0].friend_request_is_public);
      })
      .catch((error) => {
        console.log(error.message);
      });
  },[])

  return (
    <React.Fragment>
      <div class="container">
        <h6>
          This page hold the action to manage the privacy policy of a user
        </h6>
        <div class="form-check">
          <label class="form-check-label" for="check1">
            <input
              type="checkbox"
              class="form-check-input"
              onClick={() => setEmailPrivacy(!emailPrivacy)}
              checked={emailPrivacy}
            />
            Email
          </label>
        </div>
        <div class="form-check">
          <label class="form-check-label" for="check2">
            <input
              type="checkbox"
              class="form-check-input"
              onClick={() => setPhonePrivacy(!phonePrivacy)}
              checked={phonePrivacy}
            />
            Phone number
          </label>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input
              type="checkbox"
              class="form-check-input"
              onClick={() => setFriendReqPrivacy(!frientReqPrivacy)}
              checked={frientReqPrivacy}
            />
            Friend request
          </label>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserProfileSecurity;
