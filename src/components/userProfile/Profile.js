import React, { useEffect, useState } from "react";
import './../../App.css';
import { useHistory, useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import OtherUserProfile from "./OtherUserProfile";
import axios from "axios";
import UserProfileNoteFound from './../PageNoteFound/UserProfileNoteFound';
import Loader from './../loader/Loader';



const Profile = () => {
  const [userDetail, setUserDetail] = useState([]);
  const [loaderStatus, setLoaderStatus] = useState(true);


  let history = useHistory();
  let { id: otherUserId } = useParams();

  useEffect(() => {
    if (localStorage.getItem("emailId") === null) {
      history.push("/login");
    }
  }, [localStorage.getItem("emailId")]);
  
  useEffect(() => {
  
      axios.get(
          process.env.REACT_APP_API_URL + `/getUserById/${otherUserId}`,
          {
              headers: {
                  "Content-Type": "application/json",
              },
          }
      ).then((response) => {
              setUserDetail(response.data.User);
              if (response.data &&  response.data.User != null) {
                setLoaderStatus(false);
                // setUserDetail(response.data.User);
              } else {
                  setLoaderStatus(false);
              }
          })
          .catch((error) => {
              console.log(error.message);
          });
  },[otherUserId]);


  return (
    <>
      {/* {typeof otherUserId != 'undefined' && isNaN(otherUserId) == false ? <OtherUserProfile UserId={otherUserId} /> : <UserProfile />} */}
      {loaderStatus == true ? <p style={{textAlign:'center'}}><Loader /></p> : userDetail == null ? <UserProfileNoteFound /> : <UserProfile otherUserId={otherUserId} userDetail={userDetail}/>}

    </>
  )
}

export default Profile;
