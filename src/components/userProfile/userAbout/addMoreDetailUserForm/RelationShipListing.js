import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import axios from "axios";
import { getPhoneNo, postPhoneNo, deleteAboutUsDetailInfo } from "../../../../store/actions/about";
import { useSelector, useDispatch } from "react-redux";
import EditReletionshipStatus from "./EditReletionshipStatus";
import { useParams } from "react-router-dom";

const RelationShipListing = () => {
    const dispatch = useDispatch();
    const [phoneNum, setPhoneNum] = useState('');
    const [editPhoneNum, setEditPhoneNum] = useState('');
    const [reRenderComp, setReRenderComp] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [toggle, setToggle] = useState(false);
    const [editToggle, setEditToggle] = useState({ id: 0, toggle: false });
    let { id: otherUserId } = useParams();

    const relationShip = useSelector(state => state.aboutReducer.phoneno);
    const addRelationShip = useSelector(state => state.aboutReducer.addPnoneNo);
    const deleteRelaShipInfo = useSelector(state => state.aboutReducer.deleteAboutInfo);

    useEffect(() => {
        dispatch(getPhoneNo());
    }, [deleteRelaShipInfo]);
    // useMemo(() => (dispatch(getPhoneNo())),[localStorage.getItem('otherId')]);


    return (
        <React.Fragment>
            <div className="card-body">
                {relationShip != undefined && relationShip.User.aboutus.map((relaDetail) => (
                    relaDetail.type == 'relationship' ?
                        <>
                            <EditReletionshipStatus editToggle={editToggle} relaDetail={relaDetail} />
                            <div className="row px-3 mb-4 justify-content-between">
                                {otherUserId != localStorage.getItem('userId') && relaDetail.is_private != 0 ? '' :

                                    <div className="custom-control custom-checkbox custom-control-inline">
                                        <p style={{ color: 'black' }}>{relaDetail.relationship}</p>

                                    </div>
                                }
                                {otherUserId != localStorage.getItem('userId') ? '' :

                                    <div className="custom-control custom-checkbox custom-control-inline align-self-center">
                                        <i class="fa fa-pencil" style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => setEditToggle({ id: relaDetail.id, toggle: !editToggle.toggle })} aria-hidden="true"></i>&nbsp;&nbsp;
                                    <i class="fa fa-trash" style={{ fontSize: '30px', cursor: 'pointer' }} aria-hidden="true" onClick={() => dispatch(deleteAboutUsDetailInfo(relaDetail.id))}></i>
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

export default RelationShipListing;

