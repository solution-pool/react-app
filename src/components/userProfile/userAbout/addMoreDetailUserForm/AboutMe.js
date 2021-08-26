import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import { getPhoneNo, postPhoneNo } from "../../../../store/actions/about";
import { closeAboutDetailForm } from "../../../../store/actions/closeForm";

import { useSelector, useDispatch } from "react-redux";
import EditAddress from "./EditAddress";
import { useParams } from "react-router-dom";
import { accodionAction } from "../../../../store/actions/accodionAction";

const AboutMe = () => {
    const dispatch = useDispatch();
   
    const [desc, setDesc] = useState('');
    const [editToggle, setEditToggle] = useState(0);
    const description = useSelector(state => state.aboutReducer.addPnoneNo);
    const phoneNo = useSelector(state => state.aboutReducer.phoneno);
    const otherUserFlag = useSelector(state => state.userFlagReducer.userFlag);

    let { id: otherUserId } = useParams();


    const addDesc = (e) => {
       
        e.preventDefault();
        console.log(desc)
        if (desc.length != 0 ) {
            dispatch(postPhoneNo({
                user_id: localStorage.getItem("userId"),
                type: 'about_me',
                about_me : JSON.stringify(desc),
                private:0
            })).catch((error) => {
                // console.log(error.response.data.errors)
                // if (error.response.status == 400) {
                //     setToggle(true);
                //     setErrorMsg(error.response.data.errors)
                // }
            })
        } else {
            alert("Please write the description.");
        }
    }

    useEffect(() => {
        if (description != undefined && description.successCode == 200) {
            setDesc('');
        }
        dispatch(getPhoneNo());
    }, [description]);

    return (
        <React.Fragment>
            <div className="card-body">

                <form onSubmit={addDesc} >

                    <div class="form-group">
                        <textarea name="desc" value={desc} onChange={(e)=>setDesc(e.target.value)} class="form-control" placeholder="description" rows="5" id="Description"></textarea>
                    </div>
                    <div className="row px-3 mb-4 justify-content-between">
                        <div className="custom-control custom-checkbox custom-control-inline">
                        <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }} >Publish</button>&nbsp;&nbsp;&nbsp;                        </div>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }} onClick={() => dispatch(accodionAction({about_me:'about_me',status: false}))}>Cancel</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>

            </div>

        </React.Fragment >
    )
}

export default AboutMe;

