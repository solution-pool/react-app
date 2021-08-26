import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import {getPhoneNo,postPhoneNo } from "../../../../store/actions/about";
import { closeAboutDetailForm,closeEducaForm } from "../../../../store/actions/closeForm";
import { useSelector, useDispatch } from "react-redux";
import { accodionAction } from "../../../../store/actions/accodionAction";

const EducationForm = () => {
    const [qualifi, setQualification] = useState('');
    const [startyear, setStartyear] = useState('');
    const [endyear, setEndyear] = useState('');
    const [graduated, setGraduated] = useState('');
    const [desc, setDesc] = useState('');
    const [toggle, setToggle] = useState(false);
    const [editToggle, setEditToggle] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const dispatch = useDispatch();

    const addQualifi = useSelector(state => state.aboutReducer.addPnoneNo);

    const items = []
    for (let i = 2022; i >= 1997; i--) {
        items.push(<option value={i} key={i}>{i}</option>)
    }

    const addEducation = (e) => {
        e.preventDefault();
       
        if (qualifi.length != 0 || desc.length != 0 || startyear != '' || endyear != '') {
            dispatch(postPhoneNo({
                user_id: localStorage.getItem("userId"),
                type: 'university',
                university: JSON.stringify({ qualifi: qualifi, startyear: '', endyear: '', desc: '' }),
                is_private: 0
            })).catch((error) => {
                if (error.response.status == 400) {
                    setToggle(true);
                    // setErrorMsg(error.response.data.errors)
                }
            })
        } else {
            alert('There was an error saving changes to your Profile. Please try again.');
        }
    }

    useEffect(() => {
        if (addQualifi != undefined && addQualifi.successCode == 200) {
            setQualification('');
            setStartyear('');
            setEndyear('');
            setDesc('');
        }
        dispatch(getPhoneNo());
    }, [addQualifi]);

    const closeForm = ()=>{
      dispatch(closeEducaForm(false))
    }

    return (
        <React.Fragment>
            <div className="card-body">
                <form onSubmit={addEducation}>
                    <div className="form-group">
                        <input type="text" id="qualification" name="qualification" value={qualifi} onChange={(e) => setQualification(e.target.value)} className="form-control" placeholder="Highest qualification" autoComplete="off"/>
                    </div>
                    {/* <div className="form-group">
                        <div className="form-group">
                            <input type="text" id="qualification" name="qualification" value={qualifi} onChange={(e) => editQualification(e.target.value)} className="form-control" />
                        </div>
                        <select id="qualification" name="qualification" value={qualifi} onChange={(e) => setQualification(e.target.value)} className="form-control">
                            <option value="">-- Select highest qualification --</option>
                            <option value="10th">10th</option>
                            <option value="12th">12th</option>
                            <option value="Diploma">Diploma</option>
                            <option value="bca">bca</option>
                            <option value="b.tech">b.tech</option>
                        </select>
                    </div>
                    <span>Time Period</span>
                    <div className="form-group">

                        <select id="selectYear1" name="startyear" value={startyear} onChange={(e) => setStartyear(e.target.value)} style={{ width: '200px', height: '50px' }} >
                            <option value='0'>Year</option>
                            {items}
                        </select>
                        <span> to </span>
                        <select id="selectYear2" name="endyear" value={endyear} onChange={(e) => setEndyear(e.target.value)} style={{ width: '200px', height: '50px' }}>
                            <option value='0'>Year</option>
                            {items}
                        </select>
                    </div>
                    <br />
                    <div className="form-group">
                        <textarea name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" rows="5" id="comment" placeholder="Description"></textarea>
                    </div> */}
                    <hr />
                    <div className="row px-3 mb-4 justify-content-between">
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }}>Publish</button>&nbsp;&nbsp;&nbsp;
                    </div>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }} onClick={()=> dispatch(accodionAction({education:'education',status: false}))}>Cancel</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default EducationForm;

