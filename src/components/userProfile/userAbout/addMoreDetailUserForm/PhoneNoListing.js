import React, { useEffect, useState,useMemo } from 'react';
import './../../../../App.css';
import axios from "axios";
import { getPhoneNo, postPhoneNo, deleteAboutUsDetailInfo } from "../../../../store/actions/about";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import EditPhoneNum from "./EditPhoneNum";

const PhoneNoListing = () => {
    const dispatch = useDispatch();
    const [phoneNum, setPhoneNum] = useState('');
    const [editPhoneNum, setEditPhoneNum] = useState('');
    const [reRenderComp, setReRenderComp] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [toggle, setToggle] = useState(false);
    const [editToggle, setEditToggle] = useState({ id: 0, toggle: false });

    const phoneNo = useSelector(state => state.aboutReducer.phoneno);
    const addPnoneNo = useSelector(state => state.aboutReducer.addPnoneNo);
    const deletePhoneNoInfo = useSelector(state => state.aboutReducer.deleteAboutInfo);
    let { id: otherUserId } = useParams();

    // useEffect(() => {
    //     if (addPnoneNo != undefined && addPnoneNo.successCode == 200) {
    //         setPhoneNum('');
    //         setErrorMsg('');
    //     }
    //     dispatch(getPhoneNo());
    // }, [addPnoneNo, deletePhoneNoInfo]);

    useEffect(() => {
        dispatch(getPhoneNo());
    }, [deletePhoneNoInfo]);


    return (
        <React.Fragment>
            <div className="card-body">
                {phoneNo != undefined && phoneNo.User.aboutus.map((phoneNo) => (
                    phoneNo.type == 'phone_no' ?
                        <>
                            <EditPhoneNum editToggle={editToggle} phoneNo={phoneNo} />
                            <div className="row px-3 mb-4 justify-content-between">
                                {otherUserId != localStorage.getItem('userId') && phoneNo.is_private != 0 ? '' :

                                    <div className="custom-control custom-checkbox custom-control-inline">
                                        <p style={{ color: 'black' }}><i class="fa fa-phone" style={{ fontSize: '30px' }} aria-hidden="true"></i>&nbsp;&nbsp;{JSON.parse(phoneNo.phone_no).phoneCode} {JSON.parse(phoneNo.phone_no).phoneNum}</p>

                                    </div>
                                }
                                {otherUserId != localStorage.getItem('userId') ? '' :

                                    <div className="custom-control custom-checkbox custom-control-inline align-self-center">
                                        <i class="fa fa-pencil" style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => setEditToggle({ id: phoneNo.id, toggle: !editToggle.toggle })} aria-hidden="true"></i>&nbsp;&nbsp;
                                    <i class="fa fa-trash" style={{ fontSize: '30px', cursor: 'pointer' }} aria-hidden="true" onClick={() => dispatch(deleteAboutUsDetailInfo(phoneNo.id))}></i>
                                    </div>
                                }
                            </div>
                        </>
                        : ''
                ))}
            </div>
        </React.Fragment>
    )
}

export default PhoneNoListing;

