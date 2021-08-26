import React, { useEffect, useState } from "react";
import './../../../App.css';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Loader from './../../loader/Loader';
import Avatar from 'react-avatar';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGroupNmList, initialMultiSelect } from "../../../store/actions/group";
import swal from 'sweetalert';


const GroupDetailDisplay = () => {

    const [displyGp, setDisplayGp] = useState([]);
    const dispatch = useDispatch();
    const [reRenderGpList, setRenderGpList] = useState(0);
    const groupNames = useSelector(state => state.groupReducer.gpNames);
    const reRenderGp = useSelector(state => state.reRenderComReducer);
    const InitialStateMultiSelect = useSelector(state => state.groupReducer.InitialStateMultiSelect);
    // const [loaderStatus, seytLoaderStatus] = useState(true);


    useEffect(() => {
        dispatch(getGroupNmList());
    }, [reRenderGp.groupComp, reRenderGpList])

    const deleteGroup = (adminId, groupId) => {

        swal({
            title: "Are you sure?",
            text: "If you want to delete the group!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.post(
                    process.env.REACT_APP_API_URL + `/deleteUserGroup`, {
                    group_admin_id: adminId,
                    group_id: groupId
                },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                ).then((response) => {
                    setRenderGpList(reRenderGpList + 1);
                    dispatch(initialMultiSelect(true));
                    window.location.reload();
                }).catch((error) => {
                    console.log(error);
                });
            }
        });
    }
    // const EditGroup = ()=>{

    // }

    return (
        <>
            <div class="page-content page-container" id="page-content">
                <div class="padding">

                    {/* {loaderStatus == true ? <Loader /> : allFriendReq.map((friRes) => (
                      friRes.type == 1 && friRes.status == 1 ? */}
                    {groupNames.userGroupList != undefined && groupNames.userGroupList.map(value => (
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="list list-row block">
                                    <div class="list-item" data-id="19">
                                        <div>
                                            {/* <Link to={value.id} data-abc="true"> */}
                                            <span class="w-48 avatar gd-warning">
                                                <Avatar
                                                    size={45}
                                                    name={value.group_name}
                                                    round={true}>
                                                </Avatar>

                                            </span>
                                            {/* </Link> */}
                                        </div>
                                        <div class="flex">
                                            <Link class="item-author text-color" data-abc="true">
                                                {value.group_name}
                                                {/* {`${friRes.friendInfo[0].firstname != null ? friRes.friendInfo[0].firstname : ''} ${friRes.friendInfo[0].lastname != null ? friRes.friendInfo[0].lastname : ''}`} */}
                                            </Link>
                                            {/* <div class="item-except text-muted text-sm h-1x">For what reason would it be advisable for me to think about business content?</div> */}
                                        </div>
                                        <div class="no-wrap">
                                            <div class="item-date text-muted text-sm d-none d-md-block">
                                                {
                                                    new Date().toLocaleDateString()
                                                }
                                            </div>
                                        </div>
                                        {
                                            value.group_admin_id == localStorage.getItem('userId') &&
                                            <div class="no-wrap">
                                                <button type="button" class="btn btn-primary" onClick={() => deleteGroup(value.group_admin_id, value.group_id)}>Delete</button>
                                                {/* &nbsp;&nbsp;&nbsp;
                                            <button type="button" class="btn btn-primary" onClick={() => EditGroup(value.group_admin_id, value.group_id)}>Edit</button> */}
                                            </div>
                                        }
                                        {/* <div class="no-wrap">
                                            <button type="button" class="btn btn-light" style={{ background: '#e4e8ec' }} onClick={() => friendReqAcceptOrCancel(friRes.sender_id, friRes.receive_id, 0)}>Cancel</button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>


                    ))}
                </div>
            </div>

        </>
    )
}

export default GroupDetailDisplay;
