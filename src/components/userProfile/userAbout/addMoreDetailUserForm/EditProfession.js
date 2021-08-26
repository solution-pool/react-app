import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import axios from "axios";
import { getPhoneNo, postPhoneNo, getAllProfessionsNames } from "../../../../store/actions/about";
import { addCity, getCity } from "../../../../store/actions/about";
import { useSelector, useDispatch } from "react-redux";

const EditProfession = ({ editToggle, profeDetail }) => {
    // const [Profession, editProfession] = useState(profeDetail.profession);
    const [searchProfe, setSearchProfe] = useState({ name: profeDetail.profession, id: profeDetail.id });
    const [optionValues, setOptionValues] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [toggle, setToggle] = useState({ showHide: editToggle });
    const [reRenderComp, setRenderComp] = useState(0);
    const dispatch = useDispatch();
    const editProfess = useSelector(state => state.aboutReducer.addPnoneNo);
    const professListing = useSelector(state => state.aboutReducer.professListing);


    const editProfessions = (e) => {
        e.preventDefault();

        axios.post(
            process.env.REACT_APP_API_URL + `/UpdateAboutUs`,
            {
                user_id: localStorage.getItem("userId"),
                type: 'profession',
                profession: searchProfe.name,
                id: profeDetail.id,
                profession_id: searchProfe.id == 0 ? searchProfe.id : searchProfe.id,
                name: searchProfe.id == 0 ? searchProfe.name : ''
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            setRenderComp(reRenderComp + 1);
            setErrorMsg('');
        }).catch((error) => {
            if (error.response.status == 400) {
                setToggle(true);
                setErrorMsg(error.response.data.errors)
            }
        });
    }

    useEffect(() => {
        dispatch(getPhoneNo());
        dispatch(getAllProfessionsNames());
    }, [reRenderComp]);


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
        console.log(profeName, id);
        e.preventDefault();
        setSearchProfe({ name: profeName, id: id })
        setOptionValues([]);
    }
    return (
        <React.Fragment>
            <div className="card-body" style={{ display: editToggle.id == profeDetail.id && editToggle.toggle ? 'block' : 'none' }}>
                <form onSubmit={editProfessions}>
                    {/* <div className="form-group">
                        <input type="text" id="Professions" value={Profession} onChange={(e) => editProfession(e.target.value)} name="Professions" className="form-control" placeholder="Profession" />
                        <span style={{ color: 'red' }}> {errorMsg != '' ? errorMsg : ''} </span>
                    </div> */}
                    <input name="Profession" value={searchProfe.name} onChange={handleChange} placeholder="Search Profession" class="Profession" autocomplete="off"></input>
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
                    {/* <div className="form-group">

                        <select id="Professions" value={Profession} onChange={(e) => editProfession(e.target.value)} name="Professions" className="form-control">
                            <option value=''>-- Select Professions --</option>
                            <option value='Physician'>Physician</option>
                            <option value='Engineer'>Engineer</option>
                            <option value='Teacher'>Teacher</option>
                            <option value='Scientist'>Scientist</option>
                        </select>
                        <span style={{ color: 'red' }}> {errorMsg != '' ? errorMsg : ''} </span>

                    </div> */}
                    <hr />
                    <div className="row px-3 mb-4 justify-content-between">
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }}>Publish</button>&nbsp;&nbsp;&nbsp;
                    </div>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            {/* <button type="button" className="btn btn-ligh" style={{ background: '#CCCCCC' }}>Cancel</button>&nbsp;&nbsp;&nbsp; */}
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default EditProfession;

