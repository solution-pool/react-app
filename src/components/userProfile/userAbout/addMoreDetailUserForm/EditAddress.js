import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import { getPhoneNo, postPhoneNo, getStateName, getCityNamesByStateId } from "../../../../store/actions/about";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";


const EditAddress = ({ editToggle, addresDetail }) => {
    const dispatch = useDispatch();
    const [FullName, editFullName] = useState(JSON.parse(addresDetail.address).fullName);
    const [PermAddress, editPermAddress] = useState(JSON.parse(addresDetail.address).address);
    const [city, editCity] = useState(JSON.parse(addresDetail.address).city);
    const [state, editState] = useState(JSON.parse(addresDetail.address).state);
    const [country, editCountry] = useState('USA');
    const [postalCode, editPostalCode] = useState(JSON.parse(addresDetail.address).postalCode);
    const [rederComp, setRenderComp] = useState(0)
    const [toggles, setToggles] = useState(editToggle.toggle);

    const [cityName, setCityName] = useState('');
    const [stateName, setStateName] = useState('');
    const [zipCodeErr, setZipCodeErr] = useState('');
    const [searchState, setSearchState] = useState({ state_name: JSON.parse(addresDetail.address).state, state_id: '' });
    const [searchCity, setSearchCity] = useState({ city_name: JSON.parse(addresDetail.address).city });
    const [optionValues, setOptionValues] = useState([]);
    const [optionValuesCity, setOptionValuesCity] = useState([]);

    const [CityList] = useState(useSelector(state => state.aboutReducer.city));
    const addPnoneNo = useSelector(state => state.aboutReducer.addPnoneNo);
    const getStates = useSelector(state => state.aboutReducer.stateListing);
    const getStateCities = useSelector(state => state.aboutReducer.cityListing);


    const editAddressDetail = (e) => {
        e.preventDefault();

        if (PermAddress.length != 0) {
            axios.post(
                process.env.REACT_APP_API_URL + `/UpdateAboutUs`,
                {
                    user_id: localStorage.getItem("userId"),
                    type: 'address',
                    address: { fullName: '', address: PermAddress, postalCode: postalCode, city: searchCity.city_name, state: searchState.state_name, country: country },
                    id: editToggle,
                    private: 0
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
        } else {
            alert("Please enter address.");
        }
    }

    useEffect(() => {
        dispatch(getPhoneNo());
    }, [rederComp, addPnoneNo]);

    const sentZipCode = () => {
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
        } else {
            setSearchState({ state_name: '', id: '' })
        }
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
        } else {
            setSearchCity({ city_name: '' })
        }
    }

    return (
        <React.Fragment>
            <div className="card-body" style={{ display: editToggle.id == addresDetail.id && editToggle.toggle ? 'block' : 'none' }}>

                <form onSubmit={editAddressDetail} >
                    {/* <div className="form-group" >
                    <input type="text" name="fullName" value={FullName} onChange={(e) => editFullName(e.target.value)} className="form-control" placeholder="fullName" />
                </div> */}
                    <div className="form-group" >
                        <input type="text" name="id" value={editToggle} className="form-control" placeholder="fullName" hidden />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="address" value={PermAddress} onChange={(e) => editPermAddress(e.target.value)} placeholder="Address" id="Address" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="postalCode" value={postalCode} onBlur={sentZipCode} onChange={(e) => editPostalCode(e.target.value)} placeholder="Postal code" id="potaLCode" />
                        {zipCodeErr && <span style={{ color: 'red' }}>{zipCodeErr}</span>}
                    </div>
                    {/* <div className="form-group">
                    <input type="text" className="form-control" name="city" value={city} onChange={(e) => editCity(e.target.value)} placeholder="City" id="city" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="state" value={state} onChange={(e) => editState(e.target.value)} placeholder="State" id="state" />
                </div> */}
                    <input name="stateName" value={searchState.state_name} onChange={(e) => handleStateChange(e)} placeholder="Search State" class="state" autocomplete="off"></input>

                    <div class="list-group">
                        <ul style={{ listStyle: 'none' }}>
                            {
                                optionValues !== undefined ? optionValues && optionValues.slice(0, 5).map((item) => {
                                    return <><li style={{ cursor: 'pointer' }} onClick={(e) => getState(item.state_name, item.state_id, e)}>
                                        <a href="#" class="list-group-item list-group-item-action">{item.state_name}</a></li> </>
                                })
                                    :
                                    null
                            }
                        </ul>
                    </div>

                    <input name="cityName" value={searchCity.city_name} onChange={(e) => handleCityChange(e)} placeholder="Search city" class="city" autocomplete="off"></input>

                    <div class="list-group">
                        <ul style={{ listStyle: 'none' }}>
                            {
                                optionValuesCity !== undefined ? optionValuesCity && optionValuesCity.slice(0, 5).map((item) => {
                                    return <><li style={{ cursor: 'pointer' }} onClick={(e) => getCityName(item.city, e)}>
                                        <a href="#" class="list-group-item list-group-item-action">{item.city}</a></li> </>
                                })
                                    :
                                    null
                            }
                        </ul>
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text" className="form-control" name="country" value={country} placeholder="country" id="country" />
                    </div>
                    {/* <select id="selectYear" name="country" value={country} onChange={(e) => editCountry(e.target.value)} className="form-control">
                    <option value="USA" selected={'USA' == country ? 'selected' : ''} >USA</option>
                </select> */}
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

export default EditAddress;

