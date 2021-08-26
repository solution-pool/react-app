import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import { getPhoneNo, postPhoneNo, deleteAboutUsDetailInfo } from "../../../../store/actions/about";
import { useSelector, useDispatch } from "react-redux";
import EditEducation from "./EditEducation";
import { capitalizeName } from "./../../../../utility/";
import { useParams } from "react-router-dom";

const EducationListing = () => {
    const dispatch = useDispatch();
    const [editToggle, setEditToggle] = useState({ id: 0, toggle: false });

    const [CityList] = useState(useSelector(state => state.aboutReducer.city));
    const addQualifi = useSelector(state => state.aboutReducer.addPnoneNo);
    const qualifiList = useSelector(state => state.aboutReducer.phoneno);
    const deleteEducaInfo = useSelector(state => state.aboutReducer.deleteAboutInfo);
    let { id: otherUserId } = useParams();


    useEffect(() => {
        dispatch(getPhoneNo());
    }, [deleteEducaInfo]);

    
    return (
        <React.Fragment>
            {qualifiList != undefined && qualifiList.User.aboutus.map((qualifiDetail) => (
                qualifiDetail.type == 'university' ?
                    <>
                        <EditEducation editToggle={editToggle} qualifiDetail={qualifiDetail} />
                        {/*user workplace listing*/}
                        <div className="row px-3 mb-4 justify-content-between">
                            <div className="custom-control custom-checkbox custom-control-inline">
                                {otherUserId != localStorage.getItem('userId') && qualifiDetail.is_private != 0 ? '' :

                                    <ul style={{ listStyleType: 'none' }}>
                                        <li>Highest qualification : {capitalizeName(JSON.parse(qualifiDetail.university).qualifi)}</li>
                                        {/* <li>Start Year : {JSON.parse(qualifiDetail.university).startyear}</li>
                                    <li>end Year : {JSON.parse(qualifiDetail.university).endyear}</li>
                                    <li>Description : {JSON.parse(qualifiDetail.university).desc}</li> */}
                                    </ul>
                                }
                            </div>
                            {otherUserId != localStorage.getItem('userId') ? '' :

                                <div className="custom-control custom-checkbox custom-control-inline align-self-center">
                                    <i class="fa fa-pencil" style={{ fontSize: '30px' }} onClick={() => setEditToggle({ id: qualifiDetail.id, toggle: !editToggle.toggle })} aria-hidden="true"></i>&nbsp;&nbsp;
                                <i class="fa fa-trash" style={{ fontSize: '30px', cursor: 'pointer' }} aria-hidden="true" onClick={() => dispatch(deleteAboutUsDetailInfo(qualifiDetail.id))}></i>
                                </div>
                            }
                        </div>
                    </>
                    : ''
            ))}
        </React.Fragment>
    )
}

export default EducationListing;

