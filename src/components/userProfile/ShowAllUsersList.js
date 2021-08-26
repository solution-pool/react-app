import React, { useEffect, useState } from "react";
import "./../../App.css";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./../loader/Loader";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { userSendFriendRequest } from "../../store/actions/userSendFriendRequest";
import { setUserFlag } from "../../store/actions/setUserFlag";
import { useSelector, useDispatch } from "react-redux";
// import debounce from 'lodash/debounce';

const ShowAllUsersList = () => {
  const [allUsersDetail, setAllUsersDetail] = useState([]);
  const [loaderStatus, setLoaderStatus] = useState(true);
  // const [reRenderAllUserComp, SetReRenderAllUserComp] = useState(0);
  const [nameVal, setUserName] = useState("");
  const [emailVal, setEmail] = useState("");
  const sendFriendRequestReducer = useSelector(
    (state) => state.sendFriendRequestReducer
  );
  const cancelFriendRequestReducer = useSelector(
    (state) => state.cancelFriendRequestReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();

  let { id: otherUserId } = useParams();

  const sendFriendRequest = (type, receive_id) => {
    // alert(type,receive_id)
    axios
      .post(
        process.env.REACT_APP_API_URL + `/sendFriendRequest`,
        {
          sender_id: localStorage.getItem("userId"),
          receive_id: receive_id,
          type: type,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.successCode == 200) {
          // SetReRenderAllUserComp(reRenderAllUserComp + 1);
          if (type == 1) {
            history.push("#Friends_requests");
          }
          if (type == 2) {
            history.push("#Clients_requests");
          }
          dispatch(userSendFriendRequest());
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getUserDetail = (event) => {
    const { name, value } = event.target;
    console.log(name, value, nameVal, emailVal);

    if (name == "username") {
      setUserName(value);
    }
    if (name == "email") {
      setEmail(value);
    }

    if (nameVal.length > 0 || emailVal.length != 0) {
      // console.log("nv==",nameVal.trim().length+'=ev='+emailVal.trim());
      axios
        .post(
          process.env.REACT_APP_API_URL + `/getAllUser`,
          {
            id: localStorage.getItem("userId"),
            firstname: nameVal,
            email: emailVal,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("response", response.data.User);
          setAllUsersDetail(response.data.User);
          if (response.data && response.data.User != null) {
            setLoaderStatus(false);
          } else {
            setLoaderStatus(false);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const setFlag = (otherId) => {
    // dispatch(setUserFlag(true));
    localStorage.setItem("otherId", otherId);
    localStorage.setItem("flag", 1);
    history.push(`${otherId}#About`);
    window.location.reload(false);
    dispatch(setUserFlag({ flag: true, otherId: otherId }));
  };

  console.log("allUsersDetail", allUsersDetail);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <input
              className="form-control"
              type="text"
              value={nameVal}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              name="username"
              onBlur={getUserDetail}
              placeholder="FirstName.."
            />
            <br />
          </div>
          <div className="col-sm-4">
            <input className="form-control" placeholder="LastName.." />
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8">
            <input
              className="form-control"
              type="text"
              name="email"
              value={emailVal}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onBlur={getUserDetail}
              placeholder="Email.."
            />
            <br />
            <input
              className="form-control"
              type="text"
              placeholder="Number.."
            />
            <br />
            <input
              className="form-control"
              type="text"
              placeholder="Address.."
            />
            <br />
            <input
              className="form-control"
              type="text"
              placeholder="Profession.."
            />
            <br />
          </div>
        </div>
      </div>
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          {loaderStatus == true ? (
            <Loader />
          ) : (
            allUsersDetail.map((value) =>
              localStorage.getItem("userId") == value.id ? (
                ""
              ) : (
                <div className="row" key={value.id}>
                  <div className="col-sm-8 d-flex justify-content-center">
                    <div className="list list-row block">
                      <div className="list-item" data-id="19">
                        <div>
                          <span className="w-48 avatar gd-warning">
                            <Link
                              to={`/profile/${value.id}#About`}
                              onClick={(e) => setFlag(value.id)}
                              className="item-author text-color"
                              data-abc="true"
                            >
                              <Avatar
                                size={45}
                                name={`${
                                  value.firstname != null ? value.firstname : ""
                                } ${
                                  value.lastname != null ? value.lastname : ""
                                }`}
                                round={true}
                              >
                                {" "}
                                {`${
                                  value.firstname != null ? value.firstname : ""
                                } ${
                                  value.lastname != null ? value.lastname : ""
                                }`}
                              </Avatar>
                            </Link>
                          </span>
                        </div>
                        <div className="flex">
                          <Link
                            to={`/profile/${value.id}#About`}
                            onClick={(e) => setFlag(value.id)}
                            className="item-author text-color"
                            data-abc="true"
                          >
                            {`${
                              value.firstname != null ? value.firstname : ""
                            } ${value.lastname != null ? value.lastname : ""}`}
                          </Link>
                          <div className="item-except text-muted text-sm h-1x">
                            For what reason would it be advisable for me to
                            think about business content?
                          </div>
                        </div>
                        <div className="no-wrap">
                          <div className="item-date text-muted text-sm d-none d-md-block">
                            {new Date(value.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        {value.friend_request_is_public === 0 && (
                          <div className="no-wrap">
                            <button
                              type="button"
                              class="btn btn-primary"
                              onClick={() => sendFriendRequest(1, value.id)}
                            >
                              Add As Friend
                            </button>
                          </div>
                        )}
                        <div className="no-wrap">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => sendFriendRequest(2, value.id)}
                          >
                            Add As Client
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </>
  );
};

export default ShowAllUsersList;
