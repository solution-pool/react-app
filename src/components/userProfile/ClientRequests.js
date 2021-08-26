import React, { useEffect, useState } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './../../App.css';
import Echo from "laravel-echo";

import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Loader from './../loader/Loader';
import Avatar from 'react-avatar';
import { Link } from "react-router-dom";
import { cancelFriRequest } from "../../store/actions/cancelFriRequest";
import { useSelector, useDispatch } from "react-redux";


const ClientRequests = () => {
    const [allFriendReq, setAllFriendReq] = useState([])
    const [loaderStatus, setLoaderStatus] = useState(true);
    const [reRenAcceptCancel, setReRenAcceptCancel] = useState(0);
    const cancelFriendRequestReducer = useSelector(state => state.cancelFriendRequestReducer);
    const dispatch = useDispatch();
   
    useEffect(() => {
        axios.post(
            process.env.REACT_APP_API_URL + `/friendList`, {
            user_id: localStorage.getItem("userId"),
            status: 0
        },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            // console.log(response.data.userFriendList);
            setAllFriendReq(response.data.userFriendList);

            if (response.data && response.data.User != null) {
                setLoaderStatus(false);
                // setUserDetail(response.data.User);
            } else {
                setLoaderStatus(false);
            }
            // NotificationManager.success('Success message', 'Title here');


        }).catch((error) => {
            console.log(error.message);

        });


    }, [reRenAcceptCancel])


    const friendReqAccept = ((sender_id, receive_id, requestType) => {
        console.log(sender_id, receive_id, requestType);

        axios.post(
            process.env.REACT_APP_API_URL + `/acceptFriendRequest`, {
            sender_id: sender_id,
            receive_id: receive_id,
            // type: requestType
        },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
             console.log("accept friend request");
             setReRenAcceptCancel(reRenAcceptCancel+1);
            
        }).catch((error) => {
            console.log(error.message);

        });


    })

    const friendReqCancel = ((sender_id, receive_id, requestType) => {
        console.log(sender_id, receive_id, requestType);
        axios.post(
            process.env.REACT_APP_API_URL + `/cancelFriendRequest`, {
            sender_id: sender_id,
            receive_id: receive_id,
            // type: requestType
        },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            console.log("cancel friend request");
            setReRenAcceptCancel(reRenAcceptCancel+1);
            dispatch(cancelFriRequest());
        }).catch((error) => {
            console.log(error.message);

        });
        
    })

    return (
        <>
            <div class="page-content page-container" id="page-content">
                <div class="padding">

                    {loaderStatus == true ? <Loader /> : allFriendReq.map((friRes) => (
                        friRes.type == 2 && friRes.status == 0 ?
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
                                        {
                                            localStorage.getItem('userId') == friRes.sender_id ?
                                                <div class="no-wrap">
                                                    <button type="button" class="btn btn-light" style={{ background: '#e4e8ec' }} onClick={() => friendReqCancel(friRes.sender_id, friRes.receive_id, 0)}>Cancel</button>
                                                </div>
                                                :
                                                localStorage.getItem('userId') == friRes.receive_id ?
                                                    <>
                                                        <div class="no-wrap">
                                                            <button type="button" class="btn btn-primary" onClick={() => friendReqAccept(friRes.sender_id, friRes.receive_id, 1)}>Accept</button>
                                                        </div>
                                                        <div class="no-wrap">
                                                            <button type="button" class="btn btn-light" style={{ background: '#e4e8ec' }} onClick={() => friendReqCancel(friRes.sender_id, friRes.receive_id, 0)}>Cancel</button>
                                                        </div>
                                                    </>
                                                    : ''
                                        }
                                        {/* <div class="no-wrap">
                                            <button type="button" class="btn btn-primary" onClick={() => friendReqAcceptOrCancel(friRes.sender_id, friRes.receive_id, 1)}>Accept</button>
                                        </div>
                                        <div class="no-wrap">
                                            <button type="button" class="btn btn-light" style={{ background: '#e4e8ec' }} onClick={() => friendReqAcceptOrCancel(friRes.sender_id, friRes.receive_id, 0)}>Cancel</button>
                                        </div> */}
                                        {/* <button className='btn btn-success'
                                            onClick={()=>createNotification('success')}>Success
                                            </button> */}
                                        {/* <NotificationContainer /> */}

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

export default ClientRequests;
