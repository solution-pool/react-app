import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import axios from "axios";
import { getPhoneNo, postPhoneNo } from "../../../../store/actions/about";
import { useSelector, useDispatch } from "react-redux";
import { closeAboutDetailForm } from "../../../../store/actions/closeForm";
import { useParams } from "react-router-dom";

const EditAboutMe = ({ editToggle, descDetail }) => {
    const dispatch = useDispatch();
    const [desc, edittDesc] = useState(JSON.parse(descDetail.about_me));
    const [reRenderComp, setRenderComp] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [toggle, setToggle] = useState({ showHide: editToggle });
    const descStatus = useSelector(state => state.closeFormReducer.descStatus);
    let { id: otherUserId } = useParams();

    const editDescription = (e) => {
        e.preventDefault();

        axios.post(
            process.env.REACT_APP_API_URL + `/UpdateAboutUs`,
            {
                user_id: localStorage.getItem("userId"),
                type: 'about_me',
                about_me: JSON.stringify(desc),
                id: editToggle.id,
                private:0
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            // console.log("aboutme",JSON.parse(response.data.User.about_me));
            setRenderComp(reRenderComp + 1);
        }).catch((error) => {
            if (error.response.status == 400) {
                setToggle(true);
                setErrorMsg(error.response.data.errors)
            }
        });
    }

    useEffect(() => {
        dispatch(getPhoneNo());
    }, [reRenderComp]);

    return (
        <React.Fragment>
            <div className="card-body" style={{ display: editToggle.id == descDetail.id && editToggle.toggle ? 'block' : 'none' }}>
                <form onSubmit={editDescription} style={{ display: toggle ? 'block' : 'none' }}>
                    <div class="form-group">
                        <textarea name="desc" value={desc} onChange={(e) => edittDesc(e.target.value)} class="form-control" placeholder="description" rows="5" id="Description"></textarea>
                    </div>
                    <div className="row px-3 mb-4 justify-content-between">
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }}>Publish</button>
                        </div>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            {/* <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }} onClick={() => dispatch(closeAboutDetailForm(false))}>Cancel</button>&nbsp;&nbsp;&nbsp; */}
                            <button type="submit" className="btn btn-primary" >Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default EditAboutMe;

