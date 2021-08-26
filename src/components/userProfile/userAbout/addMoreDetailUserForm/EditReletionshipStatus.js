import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import axios from "axios";
import { getPhoneNo,postPhoneNo,editPostData } from "../../../../store/actions/about";
import { useSelector, useDispatch } from "react-redux";

const EditReletionshipStatus = ({editToggle,relaDetail}) => {
    const dispatch = useDispatch();
    const [relationShip, editRelationShip] = useState('');
    const [reRenderComp, setRenderComp] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [toggle, setToggle] = useState({showHide:editToggle});
    const relaShip = useSelector(state=>state.aboutReducer.relaShip);
    const editUserDetails = useSelector(state=>state.aboutReducer.editUserDetail);
    
    // const editReletionShip = (e) => {
    //     e.preventDefault();
    //         dispatch(editPostData({
    //             user_id: localStorage.getItem("userId"),
    //             type: 'relationship',
    //             relationship: relationShip,
    //             id: editToggle.id
    //         })).catch((error) => {
    //             if(error.response.status == 400){
    //                 setToggle(true);
    //                 setErrorMsg(error.response.data.errors)
    //             }
    //         })
    // }

    
    const editReletionShip = (e) => {

        e.preventDefault();

    //    if(relationShip.length > 0){
        axios.post(
            process.env.REACT_APP_API_URL + `/UpdateAboutUs`,
            {
                user_id: localStorage.getItem("userId"),
                type: 'relationship',
                relationship: relationShip,
                id: editToggle.id,
                private:0

            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            setRenderComp(reRenderComp+1);
        }).catch((error) => {
            console.log("errordsfasdfsdf",error.response.data.errors)
                if(error.response.status == 400){
                    setToggle(true);
                    setErrorMsg(error.response.data.errors)
                }

        });
    //    }else{
    //        alert("Please select relationship status")
    //    }
        
    }

    useEffect(() => {
        if(editUserDetails != undefined && editUserDetails.successCode == 200){
            setErrorMsg('');
        }
        dispatch(getPhoneNo());
    }, [reRenderComp]);
    
    return (
        <React.Fragment>
            <div className="card-body" style={{ display: editToggle.id == relaDetail.id && editToggle.toggle ? 'block' : 'none' }}>
                <form onSubmit={editReletionShip} style={{ display: toggle ? 'block' : 'none' }}>
                    <div className="form-group">
                        <select id="relationShipStatus"  name="relationShipStatus"  onChange={(e)=>editRelationShip(e.target.value)}className="form-control">
                            <option value='' >-- Select Status --</option>

                        {
                           relaShip != undefined ?  relaShip.RelationshipList.map((relaShipData)=>(
                            <option value={relaShipData.relationship_Type} selected={relaShipData.relationship_Type == relaDetail.relationship ? "selected" : ""}>{relaShipData.relationship_Type}</option>
                        ))
                        : ''
                        }
                        </select>
                        <span style={{ color: 'red' }}> {errorMsg != '' ? errorMsg : ''} </span>

                    </div>
                    <div className="row px-3 mb-4 justify-content-between">
                    <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }}>Publish</button>
                        </div>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            {/* <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }}>Cancel</button>&nbsp;&nbsp;&nbsp; */}
                            <button type="submit" className="btn btn-primary" >Update</button>
                        </div>
                    </div>
             </form>
            </div> 
        </React.Fragment>
    )
}

export default EditReletionshipStatus;

