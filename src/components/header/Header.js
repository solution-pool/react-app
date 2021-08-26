import React, { useEffect, memo } from "react";
import Avatar from "react-avatar";
import "./../../App.css";
import { Link } from "react-router-dom";
import DropDown from "./../dashboard/DropDown";
import LoginSignUpBtn from "./../userLogin/LoginSignUpBtn";
import { useSelector } from "react-redux";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Notification from "./../pushNotification/Notification";
import { goBack, backBtn } from "../../utility";
import UserAmount from "../userProfile/userAmt/UserAmount";

const Header = ({ userID }) => {
  const pushNotificationReducer = useSelector(
    (state) => state.pushNotificationReducer
  );
  let usersId =
    pushNotificationReducer.userDetail == null
      ? ""
      : pushNotificationReducer.userDetail.receive_info.id ==
          localStorage.getItem("userId") && 1;

  {
    /*
     *After sent friend request then real time notification display.
     *After sent client request then real time notification display.
     */
  }
  useEffect(() => {
    switch (usersId) {
      case 1:
        NotificationManager.success(
          `${pushNotificationReducer.userDetail.sender_info.firstname} sent you a friend request.`,
          "Request",
          3000
        );
        break;
    }
    pushNotificationReducer.userDetail != undefined &&
      pushNotificationReducer.userDetail.receive_info.id ==
        localStorage.getItem("userId") &&
      setTimeout(() => {
        window.location.reload(false);
      }, 4000);
  }, [pushNotificationReducer]);

  return (
    <>
      <div id="content" >
      <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/* <div className="row">
                <div className="col-md-2 pt-3">
                    <img  src={process.env.PUBLIC_URL + '/image/logo.png'}></img>
                </div>
                <div class="col-md-3 pt-2">
                    <div class="form-group1 has-search">
                        <span class="fa fa-search form-control-feedback"></span>
                        <input type="text" class="form-control topSearch" placeholder="Search for tiPPs" value="Search for tiPPs"  />
                    </div>
                </div>
                <div className="col-md-7 text-right">
                    <nav class="navbar navbar-expand-sm justify-content-end  pr-0">
                        <ul class="navbar-nav topIcons">
                            <li class="nav-item">                            
                            <button className="btn btn-warning customBtn">
                              <img  src={process.env.PUBLIC_URL + '/image/dollers.png'} className="doller"></img>
                              TIPP COINS
                            </button>
                            </li>
                            <li>
                              
                              <div class="dropdown noCart">
                                <span class="dropdown-toggle" data-toggle="dropdown">
                                <img  src={process.env.PUBLIC_URL + '/image/usericon.png'} className="doller"></img>
                                <i class="fa fa-angle-down angleDown"></i>
                                </span>
                                <div class="dropdown-menu">
                                  <a class="dropdown-item" href="#">Link 1</a>
                                  <a class="dropdown-item" href="#">Link 2</a>
                                  <a class="dropdown-item" href="#">Link 3</a>
                                </div>
                              </div>
                            </li>
                            <li class="nav-item bl-1">
                                <a href="#" class="loginText">LOG IN</a>
                            </li>
                            <li class="nav-item bl-1 bgdark">
                              <a href="#" class="signup">SIGN UP</a>
                            </li>
                            
                        </ul>
                    </nav>
                </div>
            </div> */}
          {/* <div > */}
          <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">

              <i class="fa fa-bars"></i>
            </button>
            <div class="input-group">
              {window.location.pathname != "/" && (
                <Link to="/">
                  <img
                    src={process.env.PUBLIC_URL + "/image/t_logo.jpg"}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      marginBottom: "10px",
                    }}
                  />
                </Link>
              )}
              <div class="input-group">
                {backBtn(window.location.pathname) != "" && (
                  // <button onClick={(e) => goBack(e)}>Go Back</button>
                  <Link to="/"><button >Go Back</button></Link>

                )}
              </div>
              &nbsp;&nbsp;&nbsp;
              {localStorage.getItem("userId") !== null ? (
                <h2 class="h3 mb-0 text-gray-800">
                  {window.location.pathname == "/dashboard" && "Dashboard"}{" "}
                </h2>
              ) : (
                ""
              )}
            </div>
            {localStorage.getItem("userId") === null ? "" : <UserAmount />}
            {localStorage.getItem("userId") === null ? "" : <Notification />}
            <ul class="navbar-nav ml-auto">
              <div class="topbar-divider d-none d-sm-block"></div>
              <li class="nav-item dropdown no-arrow show">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small ml-3">
                  {localStorage.getItem("emailId") !== null ? (
                    <Avatar
                      size={45}
                      name={localStorage.getItem("emailId")}
                      round={true}
                    >
                      {localStorage.getItem("emailId")}
                    </Avatar>
                  ) : (
                    ""
                  )}
                </span>
              </li>
              <div className="dropdown-style mr-5">
                {localStorage.getItem("userId") === null ? (
                  <LoginSignUpBtn />
                ) : (
                  <DropDown />
                )}
              </div>
            </ul>
          {/* </div> */}
        </nav>
      </div>
      <NotificationContainer />
    </>
  );
};

Header.defaultProps = {
  userID: 0,
};

export default memo(Header);
