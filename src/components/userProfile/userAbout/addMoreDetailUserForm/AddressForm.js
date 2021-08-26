import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import { getPhoneNo, postPhoneNo, getStateName, getCityNamesByStateId } from "../../../../store/actions/about";
import { closeAddreForm } from "../../../../store/actions/closeForm";
import { useSelector, useDispatch } from "react-redux";
import EditAddress from "./EditAddress";
import axios from "axios";
import { useParams } from "react-router-dom";
import { accodionAction } from "../../../../store/actions/accodionAction";

const AddressForm = () => {
    const dispatch = useDispatch();
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('USA');
    const [fullName, setFullName] = useState('');
    const [permAddress, setPermAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [cityName, setCityName] = useState('');
    const [stateName, setStateName] = useState('');
    const [zipCodeErr, setZipCodeErr] = useState('');
    const [editToggle, setEditToggle] = useState(0);
    const [searchState, setSearchState] = useState({ state_name: '', state_id: '' });
    const [searchCity, setSearchCity] = useState({ city_name: '' });
    const [optionValues, setOptionValues] = useState([]);
    const [optionValuesCity, setOptionValuesCity] = useState([]);
    let { id: otherUserId } = useParams();

    {/*GET data in redux store using useSelector hook*/ }
    const [CityList] = useState(useSelector(state => state.aboutReducer.city));
    const addPnoneNo = useSelector(state => state.aboutReducer.addPnoneNo);
    const phoneNo = useSelector(state => state.aboutReducer.phoneno);
    const getStates = useSelector(state => state.aboutReducer.stateListing);
    const getStateCities = useSelector(state => state.aboutReducer.cityListing);
 
    const addAddressDetail = (e) => {
        e.preventDefault();

        if (permAddress.length != 0) {
            dispatch(postPhoneNo({
                user_id: localStorage.getItem("userId"),
                type: 'address',
                address: JSON.stringify({ fullName: '', address: permAddress, postalCode: postalCode, city: searchCity.city_name, state: searchState.state_name, country: country }),
                private: 0
            })).catch((error) => {
                // console.log(error.response.data.errors)
                // if (error.response.status == 400) {
                //     setToggle(true);
                //     setErrorMsg(error.response.data.errors)
                // }
            })
        } else {
            alert("Please enter address.");
        }
    }

    useEffect(() => {

        if (addPnoneNo != undefined && addPnoneNo.successCode == 200) {
            setFullName('');
            setPermAddress('');
            setCity('');
            setSearchCity({ city_name: '' });
            setSearchState({ state_name: '', state_id: '' });
            setPostalCode('');
            setCityName('');
            setStateName('');
        }
        dispatch(getPhoneNo());


    }, [addPnoneNo]);

    useEffect(() => {
        dispatch(getStateName('')) && dispatch(getCityNamesByStateId(''))
    }, [])


    const sentZipCode = () => {
        
        // if (postalCode.length == 5) {
        //     dispatch(getStateName(postalCode))
        //     setZipCodeErr('')
        // } else {
        //     setZipCodeErr('Please enter valid postal code.')
        // }

        if (postalCode) {
            if (!isNaN(postalCode)) {
                if (postalCode.length == 5) {
                    dispatch(getStateName(postalCode))
                    setZipCodeErr('')
                } else {
                    setZipCodeErr('Please enter valid postal code.')
                }
            }else {
                setZipCodeErr('Please enter postal code digit formate.')
            }
        } 
    }

    const getState = (state_name, state_id, e) => {
        e.preventDefault();
        setSearchState({ state_name: state_name, state_id: state_id })
        if (state_id != '') {
            dispatch(getCityNamesByStateId(state_id))
        }
        setOptionValues([])
    }

    const handleStateChange = (e) => {
        let filterData = [];
        if (isNaN(e.target.value)) {
            if (e.target.value === "") { setOptionValues([]); } else {
                if (searchState.state_name.length > 0) {
                    filterData = getStates != undefined && getStates.stateList.filter((i) => {
                        return i.state_name.toLowerCase().match(searchState.state_name.toLowerCase())
                    })
                }
                setOptionValues(filterData);
            }
            setSearchState({ state_name: e.target.value, state_id: 1 })
        }else{
            setSearchState({ state_name: '',id:''})
        }
        // dispatch(postCommunity({ name: e.target.value, id: 1 }));
    }


    const getCityName = (city_name, e) => {
        e.preventDefault();
        setSearchCity({ city_name: city_name })
        setOptionValuesCity([])
    }

    const handleCityChange = (e) => {
        let filterData = [];
        if (isNaN(e.target.value)) {
            if (e.target.value === "") { setOptionValuesCity([]); } else {
                if (searchCity.city_name.length > 0) {
                    filterData = getStateCities != undefined && getStateCities.cityList.filter((i) => {
                        return i.city.toLowerCase().match(searchCity.city_name.toLowerCase())
                    })
                }
                setOptionValuesCity(filterData);
            }
            setSearchCity({ city_name: e.target.value })
        }else{
            setSearchCity({city_name: ''})
        }
    }

    return (
        <React.Fragment>
            <div className="card-body">

                <form onSubmit={addAddressDetail} >
                    {/* <div className="form-group">
                        <input type="text" className="form-control" name="fullName" value={fullName} placeholder="FullName" onChange={(e) => setFullName(e.target.value)} id="fullName" />
                    </div> */}
                    <div className="form-group">
                        <input
                            type="text" className="form-control" name="address" value={permAddress} onChange={(e) => setPermAddress(e.target.value)} placeholder="Address" autoComplete="off" id="Address" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="postalCode" value={postalCode} onBlur={sentZipCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Postal code" autoComplete="off" id="potaLCode" />
                        {zipCodeErr && <span style={{ color: 'red' }}>{zipCodeErr}</span>}
                    </div>

                    {/* {cityName != '' &&
                        <div className="form-group">
                            <input type="text" className="form-control" name="city" value={cityName} placeholder="City" id="city" disabled />
                        </div>
                    }
                    {stateName != '' &&
                        <div className="form-group">
                            <input type="text" className="form-control" name="state" value={stateName} placeholder="state" id="state" disabled />
                        </div>
                    } */}
                    <input
                        name="stateName"
                        value={searchState.state_name} onChange={(e) => handleStateChange(e)}
                        placeholder="Search State"
                        class="state"
                        autocomplete="off"
                        disabled={getStates != undefined && getStates.stateList.length > 0 ? '' : 'disabled'}
                    />

                    <div class="list-group">
                        <ul style={{ listStyle: 'none' }}>
                            {
                                (optionValues !== undefined) ? optionValues && optionValues.slice(0, 5).map((item) => {
                                    return <><li style={{ cursor: 'pointer' }} onClick={(e) => getState(item.state_name, item.state_id, e)}>
                                        <a href="#" class="list-group-item list-group-item-action">{item.state_name}</a></li> </>
                                })
                                    :
                                    null
                            }
                        </ul>
                    </div>

                    <input
                        name="cityName"
                        value={searchCity.city_name}
                        onChange={(e) => handleCityChange(e)}
                        placeholder="Search city"
                        class="city"
                        autocomplete="off"
                        disabled={getStateCities != undefined && getStateCities.cityList.length > 0 ? '' : 'disabled'}
                    />

                    <div class="list-group">
                        <ul style={{ listStyle: 'none' }}>
                            {
                                (optionValuesCity !== undefined) ? optionValuesCity && optionValuesCity.slice(0, 5).map((item) => {
                                    return <><li style={{ cursor: 'pointer' }} onClick={(e) => getCityName(item.city, e)}>
                                        <a href="#" class="list-group-item list-group-item-action">{item.city}</a></li> </>
                                })
                                    :
                                    null
                            }
                        </ul>
                    </div>
                    {/* <div className="form-group">
                        <input type="text" className="form-control" name="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" id="state" />
                    </div> */}

                    {/* <select id="selectYear" name="city" value={city} onChange={(e) => setCity(e.target.value)} className="form-control">
                        <option value='0'>City</option>
                        {
                            CityList != undefined ? CityList.CityList.map((cityDetail) => (
                                <option value={cityDetail.city}>{cityDetail.city}</option>
                            ))
                                : ''
                        }
                    </select> */}
                    <br />
                    <select id="selectYear" name="country" value={country} onChange={(e) => setCountry(e.target.value)} className="form-control">
                        {/* <option value='0'>Country</option> */}
                        <option value='USA'>USA</option>

                    </select>
                    <br />
                    <div className="row px-3 mb-4 justify-content-between">
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }}>Publish</button>&nbsp;&nbsp;&nbsp;
                    </div>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }} onClick={() => dispatch(accodionAction({address:'address',status: false}))}>Cancel</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>

            </div>
        </React.Fragment>
    )
}

export default AddressForm;

