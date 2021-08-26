import React, {useEffect,memo} from "react";
import Avatar from 'react-avatar';
import { useHistory } from "react-router-dom";
import './../../App.css';
import ViewPost from './../post/ViewPost';
import RedirectOnCreatePostForm from '../post/redirectPostField/RedirectOnCreatePostForm';

import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import Notification from "../pushNotification/Notification";
// import { goBackToHome } from '../../utility'
import UserAmount from '../userProfile/userAmt/UserAmount';

const DashBoard = () => {
    let history = useHistory();

    {/*Redireat the login page then user not login*/}
    useEffect(() => {
        if (localStorage.getItem("emailId") === null) {
            history.push("/login");
        } else {
            history.push("/dashboard");
        }
    }, [localStorage.getItem("emailId")]);


    return (
        <React.Fragment>
            <div id="content">
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>
                    <div class="input-group">

                        <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                            <div class="input-group">
                                <Link to="/"> <img src={process.env.PUBLIC_URL + '/image/t_logo.jpg'} style={{ borderRadius: '50%', width: '40px',marginBottom:'10px' }} /></Link>
                          &nbsp;&nbsp;&nbsp; <h2 class="h3 mb-0 text-gray-800">Dashboard</h2>
                            </div>
                            <div class="input-group">
                            <Link to="/"><button >Go Back</button></Link>
                            </div>
                        </form>
                    </div>
                    <UserAmount />
                    <Notification />
                    <ul class="navbar-nav ml-auto">
                        <div class="topbar-divider d-none d-sm-block"></div>
                        <li class="nav-item dropdown no-arrow show">
                            <span class="mr-2 d-none d-lg-inline text-gray-600 small ml-3"><Avatar size={45} name={localStorage.getItem("emailId")} round={true}>{localStorage.getItem("emailId")}</Avatar></span>
                        </li>
                        <div className="dropdown-style mr-5">
                            <DropDown />
                        </div>
                    </ul>

                </nav>
            </div>
            <RedirectOnCreatePostForm />
            <ViewPost />
        </React.Fragment>
    )
}

export default memo(DashBoard);
