import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import { getPhoneNo, postPhoneNo, deleteAboutUsDetailInfo } from "../../../../store/actions/about";
import { useSelector, useDispatch } from "react-redux";
import EditAddress from "./EditAddress";
import { capitalizeName } from "./../../../../utility/";
import { useParams } from "react-router-dom";

const AddressListing = () => {
    const dispatch = useDispatch();
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [fullName, setFullName] = useState('');
    const [permAddress, setPermAddress] = useState('');
    const [editToggle, setEditToggle] = useState({ id: 0, toggle: false });
    let { id: otherUserId } = useParams();

    {/*Get the in redux store using useSelector hook*/ }

    const [CityList] = useState(useSelector(state => state.aboutReducer.city));
    const addPnoneNo = useSelector(state => state.aboutReducer.addPnoneNo);
    const phoneNo = useSelector(state => state.aboutReducer.phoneno);
    const deleteAboutInfo = useSelector(state => state.aboutReducer.deleteAboutInfo);

    useEffect(() => {
        dispatch(getPhoneNo());
    }, [deleteAboutInfo]);


    return (
        <React.Fragment>
            {phoneNo != undefined && phoneNo.User.aboutus.map((addresDetail) => (
                addresDetail.type == 'address' ?
                    <>
                        {/*edit user address*/}
                        <EditAddress editToggle={editToggle} addresDetail={addresDetail} />
                        {/*user address listing*/}
                        <div className="row px-3 mb-4 justify-content-between">
                            <div className="custom-control custom-checkbox custom-control-inline">
                                {otherUserId != localStorage.getItem('userId') && addresDetail.is_private != 0 ? '' :

                                    <ul style={{ listStyleType: 'none' }}>

                                        {/* <li>Full Name : {capitalizeName(JSON.parse(addresDetail.address).fullName)}</li> */}
                                        <li>Address : {capitalizeName(JSON.parse(addresDetail.address).address)}</li>
                                        {JSON.parse(addresDetail.address).city != '' && <li>City : {capitalizeName(JSON.parse(addresDetail.address).city)}</li>}
                                        {JSON.parse(addresDetail.address).state && <li>State : {capitalizeName(JSON.parse(addresDetail.address).state)}</li>}
                                        <li>Country : {capitalizeName(JSON.parse(addresDetail.address).country)}</li>
                                    </ul>
                                }
                            </div>
                            {otherUserId != localStorage.getItem('userId') ? '' :

                                <div className="custom-control custom-checkbox custom-control-inline align-self-center">
                                    <i class="fa fa-pencil" style={{ fontSize: '30px' }} onClick={() => setEditToggle({ id: addresDetail.id, toggle: !editToggle.toggle })} aria-hidden="true"></i>&nbsp;&nbsp;
                                    <i class="fa fa-trash" style={{ fontSize: '30px', cursor: 'pointer' }} aria-hidden="true" onClick={() => dispatch(deleteAboutUsDetailInfo(addresDetail.id))}></i>
                                </div>
                            }
                        </div>
                    </>
                    : ''
            ))}
        </React.Fragment>
    )
}

export default AddressListing;

