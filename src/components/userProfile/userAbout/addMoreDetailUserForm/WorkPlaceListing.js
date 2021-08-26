import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import { getPhoneNo, postPhoneNo, deleteAboutUsDetailInfo } from "../../../../store/actions/about";
import { useSelector, useDispatch } from "react-redux";
import EditWorkPlace from "./EditWorkPlace";
import { capitalizeName } from "./../../../../utility/";
import { useParams } from "react-router-dom";

const WorkPlaceListing = () => {
    const dispatch = useDispatch();
    let { id: otherUserId } = useParams();
    const [editToggle, setEditToggle] = useState({ id: 0, toggle: false });

    const [CityList] = useState(useSelector(state => state.aboutReducer.city));
    const addPnoneNo = useSelector(state => state.aboutReducer.addPnoneNo);
    const workPlaceList = useSelector(state => state.aboutReducer.phoneno);
    const deleteWorkPlaceInfo = useSelector(state => state.aboutReducer.deleteAboutInfo);


    useEffect(() => {
        dispatch(getPhoneNo());
    }, [deleteWorkPlaceInfo]);
    // useMemo(() => (dispatch(getPhoneNo())),[localStorage.getItem('otherId')]);

    return (
        <React.Fragment>
            {workPlaceList != undefined && workPlaceList.User.aboutus.map((workPlaceDetail) => (
                workPlaceDetail.type == 'work_place' ?
                    <>
                        <EditWorkPlace editToggle={editToggle} workPlaceDetail={workPlaceDetail} />
                        {/*user workplace listing*/}
                        <div className="row px-3 mb-4 justify-content-between">
                            <div className="custom-control custom-checkbox custom-control-inline">
                                {otherUserId != localStorage.getItem('userId') && workPlaceDetail.is_private != 0 ? '' :

                                    <ul style={{ listStyleType: 'none' }}>
                                        <li>Company Name : {capitalizeName(JSON.parse(workPlaceDetail.work_place).companyName)}</li>
                                        <li>Position : {capitalizeName(JSON.parse(workPlaceDetail.work_place).position)}</li>
                                        <li>City : {capitalizeName(JSON.parse(workPlaceDetail.work_place).cityTwon)}</li>
                                        <li>Description : {capitalizeName(JSON.parse(workPlaceDetail.work_place).desc)}</li>
                                        <li>Year : {JSON.parse(workPlaceDetail.work_place).year}</li>
                                    </ul>
                                }
                            </div>
                            {otherUserId != localStorage.getItem('userId') ? '' :

                                <div className="custom-control custom-checkbox custom-control-inline align-self-center">
                                    <i class="fa fa-pencil" style={{ fontSize: '30px' }} onClick={() => setEditToggle({ id: workPlaceDetail.id, toggle: !editToggle.toggle })} aria-hidden="true"></i>&nbsp;&nbsp;
                                    <i class="fa fa-trash" style={{ fontSize: '30px', cursor: 'pointer' }} aria-hidden="true" onClick={() => dispatch(deleteAboutUsDetailInfo(workPlaceDetail.id))}></i>
                                </div>
                            }
                        </div>
                    </>
                    : ''
            ))}
        </React.Fragment>
    )
}

export default WorkPlaceListing;

