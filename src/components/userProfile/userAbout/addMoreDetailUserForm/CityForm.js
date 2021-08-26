import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import MsgModal from "../modal/MsgModal";
import axios from "axios";
import { addCity,getCity,getRelaShip } from "../../../../store/actions/about";
import { useSelector, useDispatch } from "react-redux";

const CityForm = () => {
    const[allCity,setAllCity] = useState([]);
    const[city,setCity] = useState('');
    const dispatch = useDispatch();

    {/*GET data in redux store using useSelector hook*/}
    const [CityList] = useState(useSelector(state=>state.aboutReducer.city));
   
    const addCityDetail = (e) => {
        e.preventDefault();
         
        console.log(city);
        axios.post(
            process.env.REACT_APP_API_URL + `/UpdateAboutUs`,{
                id:localStorage.getItem('userId'),
                current_city:city
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
            {/* <MsgModal /> */}
            <div className="card-body">
                <form onSubmit={addCityDetail}>
                    <div className="form-group">
                        <select id="selectYear" name="city" value ={city} onChange={(e)=>setCity(e.target.value)}className="form-control">
                            <option value='0'>City</option>
                            {
                              CityList != undefined ?  CityList.CityList.map((cityDetail)=>(
                                    <option value={cityDetail.id}>{cityDetail.city}</option>
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
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }}>Cancel</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default CityForm;

