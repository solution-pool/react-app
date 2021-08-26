import React, { useEffect, useState } from "react";
import "./../../../../App.css";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { useParams } from "react-router-dom";

const ContactInfo = (type) => {
  const phoneNo = useSelector((state) => state.aboutReducer.phoneno);
  const [userDetails,setUserDetails] = useState('');
  let { id } = useParams();
  console.log("idsss",id)

  useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_API_URL + `/getAllUser`,
        {
            user_id: id,
        },
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      )
      .then((response) => {
        console.log("responseDetailsss", response.data.User[0]);
        setUserDetails(response.data.User[0]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        {(userDetails !== undefined && userDetails !== '') &&
          <div className="form-check" style={{ color: 'black', marginBottom: "-6px",marginTop: "17px"}}>
            <label className="form-check-label" for="check1">
            <p style={{ color: 'black'}}><i className="fa fa-phone" style={{ fontSize: '22px' }} aria-hidden="true"></i>&nbsp;&nbsp;{userDetails.phone_no}</p>
            </label>
          </div>
        }
        {(userDetails !== undefined && userDetails !== '') &&
          <div className="form-check">
            <label className="form-check-label" for="check2">
            <i className="fa fa-envelope-open" style={{ fontSize: '22px' }} aria-hidden="true"></i>&nbsp;&nbsp; {userDetails.email}
            </label>
          </div>
        }
      </div>
    </React.Fragment>
  );
};

export default React.memo(ContactInfo);
