import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import {getPhoneNo,postPhoneNo } from "../../../../store/actions/about";
import {closeWorkPlaceForm} from "../../../../store/actions/closeForm";
import { useSelector, useDispatch } from "react-redux";
import WorkPlaceListing from "./WorkPlaceListing";
import { accodionAction } from "../../../../store/actions/accodionAction";

const WorkPlaceForm = () => {
    const dispatch = useDispatch();
    const [companyName,setCompanyName] = useState('');
    const [position,setPosition] = useState('');
    const [cityTwon,setCityTwon] = useState('');
    const [desc,setDesc] = useState('');
    const [year,setYear] = useState('');
    const [toggle, setToggle] = useState(false);
    const [editToggle, setEditToggle] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');

    const [CityList] = useState(useSelector(state => state.aboutReducer.city));
    const addWorkPlace = useSelector(state => state.aboutReducer.addPnoneNo);

    const items = []
    for (let i = 2022; i >= 1997; i--) {
        items.push(<option value={i} key={i}>{i}</option>)
    }

    const addWorkPlaceDetail = (e) => {
        e.preventDefault();
       
        if (companyName.length != 0 || position.length != 0 || cityTwon.length != 0 || desc.length != 0 || year != '') {
            dispatch(postPhoneNo({
                user_id : localStorage.getItem("userId"),
                type : 'work_place',
                work_place : JSON.stringify({companyName:companyName,position:position,cityTwon:cityTwon,desc:desc,year:year}),
                private : 0
            })).catch((error) => {
                if (error.response.status == 400) {
                    setToggle(true);
                    setErrorMsg(error.response.data.errors)
                }
            })
        }else{
            alert('There was an error saving changes to your Profile. Please try again.');
        }
    }

     useEffect(() => {
        if (addWorkPlace != undefined && addWorkPlace.successCode == 200) {
            setCompanyName('');
            setPosition('');
            setCityTwon('');
            setDesc('');
            setYear('');
        }
        dispatch(getPhoneNo());
    }, [addWorkPlace]);

    return (
        <React.Fragment>
            <div className="card-body">
                <form onSubmit={addWorkPlaceDetail}>
                    <div className="form-group">
                        <input type="text" name="companyName"  value={companyName} onChange={(e)=>setCompanyName(e.target.value)} className="form-control" placeholder="Company" autoComplete="off" id="Company" />
                    </div>
                    <div className="form-group">
                        <input type="text" name="position" value={position} onChange={(e)=>setPosition(e.target.value)} className="form-control" placeholder="Position" autoComplete="off" id="Position" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="cityTwon" value={cityTwon} onChange={(e) => setCityTwon(e.target.value)} placeholder="City" autoComplete="off" id="city" />
                    </div>
                    {/* <div className="form-group">
                    <select id="selectYear" name="city" name="cityTwon" value={cityTwon} onChange={(e)=>setCityTwon(e.target.value)} className="form-control">
                        <option value=''>City</option>
                        {
                            CityList != undefined ? CityList.CityList.map((cityDetail) => (
                                <option value={cityDetail.city}>{cityDetail.city}</option>
                            ))
                                : ''
                        }
                    </select>
                    </div> */}
                   
                    <div className="form-group">
                        <textarea name="desc" value={desc} onChange={(e)=>setDesc(e.target.value)} className="form-control" rows="5" id="comment" placeholder="Description"></textarea>
                    </div>
                    <div className="form-group">
                        <select id="selectYear" value={year} onChange={(e)=>setYear(e.target.value)} name="year" className="form-control">
                            <option value=''>Year</option>
                            {items}
                        </select>
                    </div>
                    <hr/>
                    <div className="row px-3 mb-4 justify-content-between">
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }}>Publish</button>&nbsp;&nbsp;&nbsp;
                    </div>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }} onClick={()=> dispatch(accodionAction({work_place:'work_place',status: false}))}>Cancel</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default WorkPlaceForm;

