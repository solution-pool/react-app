import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import { getPhoneNo, postPhoneNo } from "../../../../store/actions/about";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";


const EditEducation = ({ editToggle, qualifiDetail }) => {
    const dispatch = useDispatch();
    const [qualifi, editQualification] = useState(JSON.parse(qualifiDetail.university).qualifi);
    const [startyear, editStartyear] = useState(JSON.parse(qualifiDetail.university).startyear);
    const [endyear, editEndyear] = useState(JSON.parse(qualifiDetail.university).endyear);
    const [desc, editDesc] = useState(JSON.parse(qualifiDetail.university).desc);
    const [toggles, editToggles] = useState(editToggle.toggle);
    const [errorMsg, setErrorMsg] = useState('');
    const [rederComp, setRenderComp] = useState(0);

    const [CityList] = useState(useSelector(state => state.aboutReducer.city));
    const addPnoneNo = useSelector(state => state.aboutReducer.addPnoneNo);

    const startYear = []
    for (let i = 2022; i >= 1997; i--) {
        startYear.push(<option value={i} key={i} selected={i == startyear ? "selected" : ""}>{i}</option>)
    }

    const endYear = []
    for (let i = 2022; i >= 1997; i--) {
        endYear.push(<option value={i} key={i} selected={i == endyear ? "selected" : ""}>{i}</option>)
    }

    const ediEducationDetail = (e) => {
        e.preventDefault();

        axios.post(
            process.env.REACT_APP_API_URL + `/UpdateAboutUs`,
            {
                user_id: localStorage.getItem("userId"),
                type: 'university',
                university: JSON.stringify({ qualifi: qualifi, startyear: '', endyear: '', desc: '' }),
                id: editToggle.id,
                private:0
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            setRenderComp(rederComp + 1);
        }).catch((error) => {
            console.log(error.message);

        });
    }

    useEffect(() => {
        dispatch(getPhoneNo());
    }, [rederComp]);

    return (
        <React.Fragment>
            <div className="card-body" style={{ display: editToggle.id == qualifiDetail.id && editToggle.toggle ? 'block' : 'none' }}>

                <form onSubmit={ediEducationDetail}>
                    <div className="form-group">
                        <div className="form-group">
                            <input type="text" id="qualification" name="qualification" value={qualifi} onChange={(e) => editQualification(e.target.value)} className="form-control" />
                        </div>
                        {/* <select id="qualification" name="qualification" value={qualifi} onChange={(e) => editQualification(e.target.value)} className="form-control">
                            <option value="">-- Select highest qualification --</option>
                            <option value="10th">10th</option>
                            <option value="12th">12th</option>
                            <option value="Diploma">Diploma</option>
                            <option value="bca">bca</option>
                            <option value="b.tech">b.tech</option>
                        </select> */}
                    </div>
                    {/* <span>Time Period</span>
                    <div className="form-group">

                        <select id="selectYear1" name="startyear" value={startyear} onChange={(e) => editStartyear(e.target.value)} style={{ width: '200px', height: '50px' }} >
                            <option value='0'>Year</option>
                            {startYear}
                        </select>
                        <span> to </span>
                        <select id="selectYear2" name="endyear" value={endyear} onChange={(e) => editEndyear(e.target.value)} style={{ width: '200px', height: '50px' }}>
                            <option value='0'>Year</option>
                            {endYear}
                        </select>
                    </div>
                    <br />
                    <div className="form-group">
                        <textarea name="desc" value={desc} onChange={(e) => editDesc(e.target.value)} className="form-control" rows="5" id="comment" placeholder="Description"></textarea>
                    </div> */}
                    <hr />
                    <div className="row px-3 mb-4 justify-content-between">
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }}>Publish</button>&nbsp;&nbsp;&nbsp;
                    </div>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            {/* <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }} >Cancel</button>&nbsp;&nbsp;&nbsp; */}
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default EditEducation;

