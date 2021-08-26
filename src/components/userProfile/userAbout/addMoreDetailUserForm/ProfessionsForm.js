import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import axios from "axios";
import { getPhoneNo, postPhoneNo, getAllProfessionsNames } from "../../../../store/actions/about";
import { addCity, getCity } from "../../../../store/actions/about";
import { closeProfessForm } from "../../../../store/actions/closeForm";
import { useSelector, useDispatch } from "react-redux";
import { accodionAction } from "../../../../store/actions/accodionAction";

const ProfessionsForm = () => {
    const [Profession, setProfession] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [searchProfe, setSearchProfe] = useState({ name: '', id: '' });
    const [optionValues, setOptionValues] = useState([]);
    const addprofession = useSelector(state => state.aboutReducer.addPnoneNo);
    const professListing = useSelector(state => state.aboutReducer.professListing);
    const dispatch = useDispatch();

    const addProfession = (e) => {
        e.preventDefault();

        if (searchProfe.name != undefined && searchProfe.name.length != 0) {
            dispatch(postPhoneNo({
                user_id: localStorage.getItem("userId"),
                type: 'profession',
                profession: searchProfe.name,
                profession_id: searchProfe.id,
                name: searchProfe.id == 0 ? searchProfe.name : ''
            })).catch((error) => {
                if (error.response.status == 400) {
                    setErrorMsg(error.response.data.errors)
                }
            })
        } else {
            alert("Please select Profession..")
        }
    }

    useEffect(() => {
        if (addprofession != undefined && addprofession.successCode == 200) {
            setSearchProfe('');
        }
        dispatch(getPhoneNo());
        dispatch(getAllProfessionsNames());
    }, [addprofession]);


    const handleChange = (e) => {
        let filterData = [];
        if (isNaN(e.target.value)) {
            if (e.target.value === "") { setOptionValues([]); } else {
                if (searchProfe.name.length > 0) {
                    filterData = professListing != undefined && professListing.professionList.filter((i) => {
                        return i.type.toLowerCase().match(searchProfe.name.toLowerCase())
                    })
                }
                setOptionValues(filterData);
            }
            setSearchProfe({ name: e.target.value, id: 0 })
        } else {
            setSearchProfe({ name: '', id: '' })
        }
    }
    const getProfessName = (profeName, id, e) => {
        e.preventDefault();
        setSearchProfe({ name: profeName, id: id })
        setOptionValues([]);
    }
    return (
        <React.Fragment>
            <div className="card-body">
                <form onSubmit={addProfession}>
                    <input name="Profession"
                        value={searchProfe.name}
                        onChange={handleChange}
                        placeholder="Search Profession"
                        class="Profession" autocomplete="off"
                        disabled={professListing != undefined && professListing.professionList.length > 1 ? '' : 'disabled'}
                    />
                    <div class="list-group">
                        <ul style={{ listStyle: 'none' }} >
                            {
                                (optionValues !== undefined) ? optionValues && optionValues.slice(0, 5).map((item) => {
                                    return <><li style={{ cursor: 'pointer' }} onClick={(e) => getProfessName(item.type, item.id, e)}>
                                        <a href="#" class="list-group-item list-group-item-action">{item.type}</a></li> </>
                                })
                                    :
                                    null
                            }
                        </ul>
                    </div>
                    <hr />
                    <div className="row px-3 mb-4 justify-content-between">
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }}>Publish</button>&nbsp;&nbsp;&nbsp;
                    </div>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }} onClick={() => dispatch(accodionAction({profession:'profession',status: false}))}>Cancel</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default ProfessionsForm;

