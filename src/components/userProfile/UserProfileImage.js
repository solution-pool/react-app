import React, { useState, useEffect } from "react";
import './../../App.css';
import otherUserImg from "../../images/otherUserImg.jfif";
import defaultImgLogin from "../../images/defaultImgLogin.png";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Loader from '../loader/Loader'

const UserProfileImage = ({ otherUserId }) => {
  // let { id: otherUserId } = useParams();
  const [imageName, setImgName] = useState('');
  const [userDetail, setUserDetail] = useState([]);
  const [loaderStatus, setLoaderStatus] = useState(true);
  const [uploadImg, setUploadImage] = useState(0);

  const profileImage = (event) => {
    console.log("Image", event.target.files)
    if (event.target.files && event.target.files[0]) {
      let imgFile = event.target.files[0];
      const formData = new FormData();
      formData.append('profile_image', imgFile)
      formData.append('user_id', localStorage.getItem("userId"))

      axios.post(
        process.env.REACT_APP_API_URL + `/uplodeUserProfile`, formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        console.log("response", response);
        setUploadImage(uploadImg + 1);
      }).catch((error) => {
        console.log(error.message);
      });
    }
  }

  useEffect(() => {
    axios.get(
      process.env.REACT_APP_API_URL + `/getUserById/${otherUserId == localStorage.getItem("userId") ? localStorage.getItem("userId") : otherUserId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      setUserDetail(response.data.User);
    }).catch((error) => {
        console.log(error.message);
      });
  }, [uploadImg]);

  return (
    <div class="container emp-profile" >
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <img src={imageName} />
          <div class="profile-img" >
            {/* <img alt="Circle Image" class="img-raised rounded-circle img-fluid"
              src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"} alt="" /> */}
            <img alt="Circle Image" onClick={(e) => profileImage(e)} class="img-raised rounded-circle img-fluid"
              src={otherUserId == localStorage.getItem("userId") ? userDetail != undefined && userDetail.profile_image != null ?
                userDetail.profile_image : defaultImgLogin
                : userDetail != undefined && userDetail.profile_image != null ? userDetail.profile_image : defaultImgLogin} alt="" />
            {otherUserId == localStorage.getItem("userId")
              &&
              <div class="file  btn-primary" >Change Photo
                <input type="file" name="myImage" onChange={profileImage} />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileImage;