import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import axios from "axios";
import { getPhoneNo, postPhoneNo, getPhoCodeList } from "../../../../store/actions/about";
import { closePhoNoForm } from "../../../../store/actions/closeForm";

import { useSelector, useDispatch } from "react-redux";
import EditPhoneNum from "./EditPhoneNum";
import { accodionAction } from "../../../../store/actions/accodionAction";

const PhoneNum = () => {
    const dispatch = useDispatch();
    const [phoneNum, setPhoneNum] = useState('');
    const [phoneCode, setPhoneCode] = useState('');
    const [editPhoneNum, setEditPhoneNum] = useState('');
    const [reRenderComp, setReRenderComp] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [bothErrors,setBothError] = useState('');
    const [toggle, setToggle] = useState(false);
    const [editToggle, setEditToggle] = useState(0);

    const phoneNo = useSelector(state => state.aboutReducer.phoneno);
    const addPnoneNo = useSelector(state => state.aboutReducer.addPnoneNo);
    const PhoCodeList = useSelector(state => state.aboutReducer.PhoCodeList);



    const addPhoneNo = (e) => {
        e.preventDefault();
    //    console.log("phoneCode", phoneCode+'-'+phoneNum.length);
        if (phoneNum.length != 0 && phoneCode.length > 1) {
            console.log(JSON.stringify({phoneNum : phoneNum,phoneCode:phoneCode}));
            dispatch(postPhoneNo({
                user_id: localStorage.getItem("userId"),
                type: 'phone_no',
                phone_no: JSON.stringify({phoneNum : phoneNum,phoneCode:phoneCode}),
                private: 0
            })).catch((error) => {
                if (error.response.status == 400) {
                    setToggle(true);
                    // setErrorMsg(error.response.data.errors)
                }
            })
        }else{
            setErrorMsg('');
            setBothError('All fields are required.');
        }
    }

    useEffect(() => {
        if (addPnoneNo != undefined && addPnoneNo.successCode == 200) {
            setPhoneNum('');
            setErrorMsg('');
            setBothError('');
        }
        dispatch(getPhoneNo());
    }, [addPnoneNo]);

    useEffect(() => {
        dispatch(getPhoCodeList());
    }, [])

    const validateNum = ()=>{
        if(phoneNum.length != 10){
            setBothError('');
            setErrorMsg("Please enter 10 digits phone number.")
        }
        else{
            setBothError('');
            setErrorMsg('')
        }
    }
    return (
        <React.Fragment>
            <div className="card-body">
                <form onSubmit={addPhoneNo}>
                    <div className="form-group" style={{ /*display: toggle ? 'block' : 'none',*/ borderRadius: phoneNum.length <= 10 ? '' : '2px solid red' }}>
                        <input type="number" name="phoneNum" value={phoneNum} onBlur={validateNum} onChange={(e) => setPhoneNum(e.target.value)} className="form-control" placeholder="Number" id="number" />
                        <span style={{ color: 'red' }}> {errorMsg != '' ? errorMsg : ''} </span>
                        <span style={{ color: 'red' }}> {bothErrors != '' ? bothErrors : ''} </span>
                        
                    </div>
                    {/* <div className="form-group" style={{ display: toggle ? 'block' : 'none', borderRadius: phoneNum.length <= 10 ? '' : '2px solid red' }}>
                        <input type="number" name="phoneCode" value={phoneNum} onChange={(e) => setPhoneCode(e.target.value)} className="form-control" placeholder="Phone number code" id="number" />
                    </div> */}

                    <select id="selectYear"  name="country" value={phoneCode}  onChange={(e) => setPhoneCode(e.target.value)} className="form-control">
                        <option value='0'> --Select phone number code-- </option>
                        {PhoCodeList != undefined && PhoCodeList.phoneCountryCodeList.map((phoneCode) => (
                                <>
                                    <option value={phoneCode.country_code}>{phoneCode.country_code}</option>
                                </>
                            ))
                        }
                    </select>
                    <hr/>
                    <div className="row px-3 mb-4 justify-content-between">
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }}>Publish</button>&nbsp;&nbsp;&nbsp;
                    </div>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }} onClick={() => dispatch(accodionAction({phone_no:'phone_no',status: false}))}>Cancel</button>&nbsp;&nbsp;&nbsp;
                            <button type="submit" className="btn btn-primary" >Save</button>
                        </div>
                    </div>


                   

                </form>
                {/* {phoneNo != undefined && phoneNo.User.aboutus.map((phoneNo) => (
                    phoneNo.type == 'phone_no' ?
                        <>
                            <EditPhoneNum editToggle={editToggle} phoneNo={phoneNo} />
                            <div className="row px-3 mb-4 justify-content-between">
                                <div className="custom-control custom-checkbox custom-control-inline">
                                    <p style={{ color: 'black' }}><i class="fa fa-phone" style={{ fontSize: '30px' }} aria-hidden="true"></i>&nbsp;&nbsp;{phoneNo.phone_no}</p>

                                </div>
                                <div className="custom-control custom-checkbox custom-control-inline align-self-center">
                                    <i class="fa fa-pencil" style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => setEditToggle(phoneNo.id)} aria-hidden="true"></i>&nbsp;&nbsp;
                                    <i class="fa fa-trash" style={{ fontSize: '30px', cursor: 'pointer' }} aria-hidden="true"></i>
                                </div>
                            </div>

                        </>
                        : ''
                ))} */}
            </div>
        </React.Fragment>
    )
}

export default PhoneNum;

