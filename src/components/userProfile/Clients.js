
import React, { useEffect, useState } from "react";
import './../../App.css';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Loader from './../loader/Loader';
import Avatar from 'react-avatar';
import { Link } from "react-router-dom";


const Clients = () => {
   
    const [allFriendReq, setAllFriendReq] = useState([]);
    const [loaderStatus, setLoaderStatus] = useState(true);

    useEffect(() => {
        axios.post(
            process.env.REACT_APP_API_URL + `/friendList`, {
            user_id: localStorage.getItem("userId"),
            status: 1
        },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            setAllFriendReq(response.data.userFriendList);
            if (response.data && response.data.User != null) {
                setLoaderStatus(false);
            } else {
                setLoaderStatus(false);
            }
        }).catch((error) => {
            console.log(error.message);

        });


    }, [])
   
    console.log("accept",allFriendReq);
    return (
        <>
            <div class="page-content page-container" id="page-content">
                <div class="padding">

                    {loaderStatus == true ? <Loader /> : allFriendReq.map((friRes) => (
                      friRes.type == 2 && friRes.status == 1 ?

                        <div class="row">
                            <div class="col-sm-8">
                                <div class="list list-row block">
                                    <div class="list-item" data-id="19">
                                        <div>
                                            {/* <Link to={value.id} data-abc="true"> */}
                                            <span class="w-48 avatar gd-warning">
                                                <Avatar
                                                    size={45}
                                                    name={`${friRes.friendInfo[0].firstname != null ? friRes.friendInfo[0].firstname : ''} ${friRes.friendInfo[0].lastname != null ? friRes.friendInfo[0].lastname : ''}`} round={true}>
                                                    {`${friRes.friendInfo[0].firstname != null ? friRes.friendInfo[0].firstname : ''} ${friRes.friendInfo[0].lastname != null ? friRes.friendInfo.lastname : ''}`}
                                                </Avatar>

                                            </span>
                                            {/* </Link> */}
                                        </div>
                                        <div class="flex">
                                            <Link class="item-author text-color" data-abc="true">
                                                {`${friRes.friendInfo[0].firstname != null ? friRes.friendInfo[0].firstname : ''} ${friRes.friendInfo[0].lastname != null ? friRes.friendInfo[0].lastname : ''}`}
                                            </Link>
                                            <div class="item-except text-muted text-sm h-1x">For what reason would it be advisable for me to think about business content?</div>
                                        </div>
                                        <div class="no-wrap">
                                            <div class="item-date text-muted text-sm d-none d-md-block">
                                                {
                                                    new Date(friRes.created_at).toLocaleDateString()
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      : ''

                    ))}
                </div>
            </div>

        </>
    )
}

export default Clients;
