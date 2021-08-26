import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import axios from "axios";
import { addCity,getCity } from "../../../../store/actions/about";
import { useSelector, useDispatch } from "react-redux";

const HomeTownForm = () => {
    const [homeTwon,setHomeTown] = useState('');
    const[city,setCity] = useState('');

    const [CityList] = useState(useSelector(state=>state.aboutReducer.city));
    

    const addHomeTown = (e)=>{
        e.preventDefault();

        axios.post(
            process.env.REACT_APP_API_URL + `/UpdateAboutUs`, {
            user_id: localStorage.getItem("userId"),
            home_town: homeTwon,
            private:0
        },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
        }).catch((error) => {
            console.log(error.message);

        });
    }
    return (
        <React.Fragment>
            <div className="card-body">
                <form onSubmit={addHomeTown}>
                    <div className="form-group">
                        <select id="selectYear" name="city" value ={city} onChange={(e)=>setCity(e.target.value)}className="form-control">
                            <option value='0'>Home town</option>
                            {
                              CityList != undefined ?  CityList.CityList.map((cityDetail)=>(
                                    <option value={cityDetail.id}>{cityDetail.city}</option>
                                ))
                                : ''
                            }
                        </select>
                        {/* <select id="selectYear" name="hometown" onChange={(e)=>setHomeTown(e.target.value)} className="form-control">
                            <option value='0'>Home town</option>
                            <option value='1'>Noida,Uttar Pradesh</option>
                            <option value='2'>Dehli,India</option>
                            <option value='3'>Houston,Texas</option>
                            <option value='4'>Mathura,,Uttar Pradesh</option>
                        </select> */}
                    </div>
                    <hr />
                    <div className="row px-3 mb-4 justify-content-between">
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }}>Publish</button>&nbsp;&nbsp;&nbsp;
                    </div>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }}>Cancel</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default HomeTownForm;

