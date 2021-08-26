import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import { getRelaShip, postPhoneNo } from "../../../../store/actions/about";
import { closeRelaShipForm } from "../../../../store/actions/closeForm";
import { useSelector, useDispatch } from "react-redux";
import { accodionAction } from "../../../../store/actions/accodionAction";

const RelationshipStatusForm = () => {
    const [relationShipStatus, SetRelationShipStatus] = useState('');
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const [editToggle, setEditToggle] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const relaShip = useSelector(state => state.aboutReducer.relaShip);

    const bindDropDown = () => {
        dispatch(getRelaShip())
    }

    const addRelShipStatus = (e) => {
        e.preventDefault();
        if (relationShipStatus.length != 0) {
            dispatch(postPhoneNo({
                user_id: localStorage.getItem("userId"),
                type: 'relationship',
                relationship: relationShipStatus,
                private:0
            })).catch((error) => {
                if (error.response.status == 400) {
                    setToggle(true);
                    setErrorMsg(error.response.data.errors)
                }
            })
        } else {
            alert('Plese select relationship status');
        }
    }

    return (
        <React.Fragment>
            <div className="card-body">
                <form onSubmit={addRelShipStatus}>
                    <div className="form-group">
                        <select id="relationShipStatus" onClick={bindDropDown} name="relationShipStatus" value={relationShipStatus} onChange={(e) => SetRelationShipStatus(e.target.value)} className="form-control">
                            <option value='0' >-- Select Status --</option>
                            {
                                relaShip != undefined ? relaShip.RelationshipList.map((relaShipData) => (
                                    <option value={relaShipData.relationship_Type}>{relaShipData.relationship_Type}</option>
                                ))
                                    : ''
                            }
                        </select>
                    </div>
                    <hr />
                    <div className="row px-3 mb-4 justify-content-between">
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }}>Publish</button>&nbsp;&nbsp;&nbsp;
                    </div>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }} onClick={() => dispatch(accodionAction({relationship:'relationship',status: false}))}>Cancel</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default RelationshipStatusForm;

