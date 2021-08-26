import React from "react";
import './../../App.css';
import UserProfileImage from "./UserProfileImage";

const FriendClientBtn = () => {

    return (
        <div class="container">
            <div class="row">
                <div class="col-md-4 ml-auto">
                    <button type="button" class="btn btn-primary mr-3">Add As Friend</button>
                    <button type="button" class="btn btn-primary">Add As Client</button>
                </div>
            </div>
        </div>
    )
}

export default FriendClientBtn;
