import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import axios from "axios";
import { getPhoneNo, postPhoneNo, getPhoCodeList } from "../../../../store/actions/about";
import { useSelector, useDispatch } from "react-redux";

const EditPhoneNum = ({ editToggle, phoneNo }) => {
    const dispatch = useDispatch();
    const [PhoneNu, editPhoneNum] = useState(JSON.parse(phoneNo.phone_no).phoneNum);
    const [phoneCod, editPhoneCode] = useState(JSON.parse(phoneNo.phone_no).phoneCode);

    const [reRenderComp, setRenderComp] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [bothErrors, setBothError] = useState('');
    const [toggle, setToggle] = useState({ showHide: editToggle });
    const PhoCodeList = useSelector(state => state.aboutReducer.PhoCodeList);


    const editPhoneNos = (e) => {
        e.preventDefault();
        if (PhoneNu.length != 0 && phoneCod.length > 1) {
            axios.post(
                process.env.REACT_APP_API_URL + `/UpdateAboutUs`,
                {
                    user_id: localStorage.getItem("userId"),
                    type: 'phone_no',
                    phone_no: JSON.stringify({ phoneNum: PhoneNu, phoneCode: phoneCod }),
                    id: editToggle.id,
                    private: 0
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                setRenderComp(reRenderComp + 1);
                setBothError('');
            }).catch((error) => {
                if (error.response.status == 400) {
                    setToggle(true);
                    // setErrorMsg(error.response.data.errors)
                }
            });
        } else {
            setErrorMsg('');
            setBothError('All fields are required.');
        }
    }

    useEffect(() => {
        dispatch(getPhoneNo());
    }, [reRenderComp]);

    useEffect(() => {
        dispatch(getPhoCodeList());
    }, [])

    const validateNum = () => {
        if (PhoneNu.length != 10) {
            setBothError('');
            setErrorMsg("Please enter 10 digits phone number.")
        }
        else {
            setBothError('');
            setErrorMsg('')
        }
    }

    return (
        <React.Fragment>
            <div className="card-body" style={{ display: editToggle.id == phoneNo.id && editToggle.toggle ? 'block' : 'none' }}>
                <form onSubmit={editPhoneNos} style={{ display: toggle ? 'block' : 'none' }}>
                    <div className="form-group" >
                        <input type="number" name="phoneNum" value={PhoneNu} onBlur={validateNum} onChange={(e) => editPhoneNum(e.target.value)} className="form-control" placeholder="number" />
                        <span style={{ color: 'red' }}> {errorMsg != '' ? errorMsg : ''} </span>
                        <span style={{ color: 'red' }}> {bothErrors != '' ? bothErrors : ''} </span>
                    </div>
                    <select id="selectYear" name="country" value={phoneCod} onChange={(e) => editPhoneCode(e.target.value)} className="form-control">
                        <option value='0'> --Select phone number code-- </option>
                        {PhoCodeList != undefined && PhoCodeList.phoneCountryCodeList.map((phoneCode) => (
                            <>
                                <option value={phoneCode.country_code} selected={phoneCode.country_code == phoneCod ? "selected" : ""}>{phoneCode.country_code}</option>
                            </>
                        ))
                        }
                    </select>
                    <hr />
                    <div className="row px-3 mb-4 justify-content-between">
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }}>Publish</button>
                        </div>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            {/* <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }}>Cancel</button>&nbsp;&nbsp;&nbsp; */}
                            <button type="submit" className="btn btn-primary" >Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default EditPhoneNum;

