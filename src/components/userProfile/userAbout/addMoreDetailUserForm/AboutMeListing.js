import React, { useEffect, useMemo, useState } from 'react';
import './../../../../App.css';
import axios from "axios";
import { getPhoneNo, postPhoneNo, deleteAboutUsDetailInfo } from "../../../../store/actions/about";
import { useSelector, useDispatch } from "react-redux";
import EditAboutMe from "./EditAboutMe";
import { useParams } from "react-router-dom";

const AboutMeListing = () => {
    const dispatch = useDispatch();
    const [phoneNum, setPhoneNum] = useState('');
    const [editPhoneNum, setEditPhoneNum] = useState('');
    const [reRenderComp, setReRenderComp] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [toggle, setToggle] = useState(false);
    const [editToggle, setEditToggle] = useState({ id: 0, toggle: false });
    const descList = useSelector(state => state.aboutReducer.phoneno);
    const description = useSelector(state => state.aboutReducer.addPnoneNo);
    const deleteAboutInfo = useSelector(state => state.aboutReducer.deleteAboutInfo);
    const otherUserFlag = useSelector(state => state.userFlagReducer.userFlag);

    let { id: otherUserId } = useParams();


    // const deleteAboutMeInfo = (aboutMeId)=>{
    //     dispatch(deleteAboutUsDetailInfo(aboutMeId));
    // } 

    // useEffect(()=>{
    //     if(otherUserFlag){
    //         dispatch(getPhoneNo(otherUserFlag.otherId));
    //     }
    // }, [])

    // useEffect(() => {
    //     console.log("checkData>>>",localStorage.getItem('otherId'))
    //     // if (otherUserId) {
    //     //     dispatch(getPhoneNo(otherUserId));
    //     // }
    //     dispatch(getPhoneNo());

    // }, [description, deleteAboutInfo]);
    
    // console.log("datashow>>>")
    useEffect(() =>{
    console.log(">>>" , localStorage.getItem('otherId'))
    dispatch(getPhoneNo())
    }
    ,[localStorage.getItem('otherId')]);

    return (
        <React.Fragment>
            <div className="card-body">
                {descList != undefined && descList.User.aboutus.map((descDetail) => (
                    descDetail.type == 'about_me' ?
                        <>
                            <EditAboutMe editToggle={editToggle} descDetail={descDetail} />

                            <div className="row px-3 mb-4 justify-content-between">
                             
                                {otherUserId != localStorage.getItem('userId') && descDetail.is_private != 0 ? '' :
                                
                                    <div className="custom-control custom-checkbox custom-control-inline text-break ">
                                        <label>Summary : </label><p style={{ color: 'black' }}>{JSON.parse(descDetail.about_me)}</p>
                                    </div>
                                }
                                {otherUserId != localStorage.getItem('userId') ? '' :
                                    <div className="custom-control custom-checkbox custom-control-inline align-self-center">
                                        <i class="fa fa-pencil" style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => setEditToggle({ id: descDetail.id, toggle: !editToggle.toggle })} aria-hidden="true"></i>&nbsp;&nbsp;
                                    <i class="fa fa-trash" style={{ fontSize: '30px', cursor: 'pointer' }} aria-hidden="true" onClick={() => dispatch(deleteAboutUsDetailInfo(descDetail.id))}></i>
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

export default AboutMeListing;

