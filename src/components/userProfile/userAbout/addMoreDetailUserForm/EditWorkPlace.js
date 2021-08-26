import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import { getPhoneNo, postPhoneNo,editPostData } from "../../../../store/actions/about";
import {closeWorkPlaceForm} from "../../../../store/actions/closeForm";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";


const EditWorkPlace = ({ editToggle, workPlaceDetail }) => {
    const dispatch = useDispatch();

    const [companyName, editCompanyName] = useState(JSON.parse(workPlaceDetail.work_place).companyName);
    const [position, editPosition] = useState(JSON.parse(workPlaceDetail.work_place).position);
    const [cityTown, editCityTown] = useState(JSON.parse(workPlaceDetail.work_place).cityTwon);
    const [desc, editDesc] = useState(JSON.parse(workPlaceDetail.work_place).desc);
    const [year, editYear] = useState(JSON.parse(workPlaceDetail.work_place).year);
    const [toggles, editToggles] = useState(editToggle.toggle);
    const [errorMsg, setErrorMsg] = useState('');
    const [rederComp, setRenderComp] = useState(0);

    const [CityList] = useState(useSelector(state => state.aboutReducer.city));
    const addPnoneNo = useSelector(state => state.aboutReducer.addPnoneNo);
    const editUserDetails = useSelector(state=>state.aboutReducer.editUserDetail);


    const items = []
    for (let i = 2022; i >= 1997; i--) {
        items.push(<option value={i} key={i} selected={i == year ? "selected" : ""}>{i}</option>)
    }

    const ediWorkPlaceDetail = (e) => {
        e.preventDefault();
        console.log(JSON.stringify({ companyName: companyName, position: position, cityTwon: cityTown, desc: desc, year: year }))
        if (companyName.length != 0 || position.length != 0 || cityTown.length != 0 || desc.length != 0 || year != '') {

            dispatch(editPostData({
                user_id: localStorage.getItem("userId"),
                type: 'work_place',
                work_place: JSON.stringify({ companyName: companyName, position: position, cityTwon: cityTown, desc: desc, year: year }),
                private: 0,
                id: editToggle.id
            })).catch((error) => {
                if(error.response.status == 400){
                    // setToggle(true);
                    setErrorMsg(error.response.data.errors)
                }
            })
        }else{
            alert('There was an error saving changes to your Profile. Please try again.');
        }
    }
    // const ediWorkPlaceDetail = (e) => {
    //     e.preventDefault();

    //     axios.post(
    //         process.env.REACT_APP_API_URL + `/UpdateAboutUs`,
    //         {
    //             user_id: localStorage.getItem("userId"),
    //             type: 'work_place',
    //             work_place: JSON.stringify({ companyName: companyName, position: position, cityTwon: cityTown, desc: desc, year: year }),
    //             is_private: 0,
    //             id: editToggle.id
    //         },
    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         }
    //     ).then((response) => {
    //         setRenderComp(rederComp + 1);
    //     }).catch((error) => {
    //         console.log(error.message);

    //     });
    // }
    // useEffect(() => {
    //     // if (editUserDetails != undefined && editUserDetails.successCode == 200) {
    //     //     editCompanyName(companyName);
    //     //     editPosition(position);
    //     //     editCityTown(cityTown);
    //     //     editDesc(desc);
    //     //     editYear(year);
    //     // }
    //     dispatch(getPhoneNo());
    // }, [editUserDetails,addPnoneNo]);
    
    useEffect(() => {
        dispatch(getPhoneNo());
    }, [editUserDetails]);

    return (
        <React.Fragment>
            <div className="card-body" style={{ display: editToggle.id == workPlaceDetail.id && editToggle.toggle ? 'block' : 'none' }}>
                <form onSubmit={ediWorkPlaceDetail}>
                    <div className="form-group">
                        <input type="text" name="companyName" value={companyName} onChange={(e) => editCompanyName(e.target.value)} className="form-control" placeholder="Company" id="Company" />
                    </div>
                    <div className="form-group">
                        <input type="text" name="position" value={position} onChange={(e) => editPosition(e.target.value)} className="form-control" placeholder="Position" id="Position" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="cityTwon" value={cityTown} onChange={(e) => editCityTown(e.target.value)} placeholder="City" id="city" />
                    </div>
                    {/* <div className="form-group">
                        <select id="selectYear" name="city" name="cityTwon" value={cityTown} onChange={(e) => editCityTown(e.target.value)} className="form-control">
                            <option value=''>City</option>
                            {
                                CityList != undefined ? CityList.CityList.map((cityDetail) => (
                                    <option value={cityDetail.city} selected={cityDetail.city == cityTown ? "selected" : ""}>{cityDetail.city}</option>
                                ))
                                    : ''
                            }
                        </select>
                    </div> */}

                    <div className="form-group">
                        <textarea name="desc" value={desc} onChange={(e) => editDesc(e.target.value)} className="form-control" rows="5" id="comment" placeholder="Description"></textarea>
                    </div>
                    <div className="form-group">
                        <select id="selectYear" value={year} onChange={(e) => editYear(e.target.value)} name="year" className="form-control">
                            <option value=''>Year</option>
                            {items}
                        </select>
                    </div>
                    <br />
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

export default EditWorkPlace;

