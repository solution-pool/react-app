import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import axios from "axios";
import { getPhoneNo, postPhoneNo, deleteAboutUsDetailInfo } from "../../../../store/actions/about";
import { useSelector, useDispatch } from "react-redux";
import EditProfession from "./EditProfession";
import { capitalizeName } from "./../../../../utility/";
import { useParams } from "react-router-dom";

const ProfessionListing = () => {
    const dispatch = useDispatch();
    const [phoneNum, setPhoneNum] = useState('');
    const [editPhoneNum, setEditPhoneNum] = useState('');
    const [reRenderComp, setReRenderComp] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [toggle, setToggle] = useState(false);
    const [editToggle, setEditToggle] = useState({ id: 0, toggle: false });
    let { id: otherUserId } = useParams();

    const phoneNo = useSelector(state => state.aboutReducer.phoneno);
    const addProfession = useSelector(state => state.aboutReducer.addPnoneNo);
    const deleteProfessInfo = useSelector(state => state.aboutReducer.deleteAboutInfo);


    useEffect(() => {
        dispatch(getPhoneNo());
    }, [addProfession, deleteProfessInfo]);
    


    return (
        <React.Fragment>
            <div className="card-body">
                {phoneNo != undefined && phoneNo.User.aboutus.map((profeDetail) => (
                    profeDetail.type == 'profession' ?
                        <>
                            <EditProfession editToggle={editToggle} profeDetail={profeDetail} />

                            <div className="row px-3 mb-4 justify-content-between">
                                {otherUserId != localStorage.getItem('userId') && profeDetail.is_private != 0 ? '' :

                                    <div className="custom-control custom-checkbox custom-control-inline">
                                        <p style={{ color: 'black' }}><i class="fa fa-user-tie" style={{ fontSize: '30px' }} aria-hidden="true"></i>&nbsp;&nbsp;{capitalizeName(profeDetail.profession)}</p>

                                    </div>
                                }
                                {otherUserId != localStorage.getItem('userId') ? '' :

                                    <div className="custom-control custom-checkbox custom-control-inline align-self-center">
                                        <i class="fa fa-pencil" style={{ fontSize: '30px' }} onClick={() => setEditToggle({ id: profeDetail.id, toggle: !editToggle.toggle })} aria-hidden="true"></i>&nbsp;&nbsp;
                                    <i class="fa fa-trash" style={{ fontSize: '30px', cursor: 'pointer' }} aria-hidden="true" onClick={() => dispatch(deleteAboutUsDetailInfo(profeDetail.id))}></i>
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

export default ProfessionListing;

