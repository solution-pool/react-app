import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import options from "./data";
import { Multiselect } from "multiselect-react-dropdown";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Badge from 'react-bootstrap/Badge';
import GroupDetailDisplay from './GroupDetailDisplay';
import './../../../App.css';
import axios from "axios";
import Loader from '../../loader/Loader';
import { reRenderUserAmt,reRenderGroupComp } from "../../../store/actions/reRenderComponent";
import {useDispatch } from "react-redux";



const EditGroup = () => {
    const [selectedMembIds, setSelectedMembIds] = useState([]);
    const [groupName, setGroupName] = useState();
    const [groupNnError, setgrNmError] = useState('');
    const [allFriendClient, setAllFriendClient] = useState([]);
    const [loaderStatus, setLoaderStatus] = useState(true);
    const [reRenderComp, setReRenderComp] = useState(0);
    const [showGroupForm, SetshowGroupForm] = useState(false);
    const dispatch  = useDispatch();

    {/*add group member*/}
    const onSelect = (selectedList, selectedItem) => {
        const allClientFriIds = selectedList.map(function (value) {
            return value.id;
        });
        setSelectedMembIds(allClientFriIds);
    }
    
    {/*Remove group member*/}
    const onRemove = (selectedList, removedItem) => {
        console.log(selectedList)
    }

    {/*create the group member*/}
    const CreateGroups = (e) => {
        e.preventDefault();
        axios.post(
            process.env.REACT_APP_API_URL + `/addUserGroup`, {
            group_admin_id: localStorage.getItem("userId"),
            group_name: groupName,
            groupMemberId: selectedMembIds
        },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {

            if (response.status == 201) {
                setgrNmError('')
                setAllFriendClient([]);
                setGroupName('')
                SetshowGroupForm(false)
                dispatch(reRenderGroupComp())
                setReRenderComp(reRenderComp + 1);
            }
        }).catch((error) => {
            if (error.response != undefined) {
                error.response.status == 400 && setgrNmError(error.response.data.errors)
            }
        });

    }

   {/*Get the members*/}
    useEffect(() => {
        axios.post(
            process.env.REACT_APP_API_URL + `/getUserClientOrFriendList`, {
            user_id: localStorage.getItem("userId"),
        },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            setAllFriendClient(response.data.userFriendList);
            
        }).catch((error) => {
            // console.log(error.message);
        });
    }, [reRenderComp])

    return (

        <>
            <div class="bs-example">
                <Badge pill variant="primary"
                    onClick={() => SetshowGroupForm(!showGroupForm)}
                    style={{ fontSize: '20px', marginBottom: '20px' }}>
                    <i class="fa fa-plus-circle"></i> {'Create Group'}
                </Badge>
                <div style={{ display: showGroupForm ? 'block' : 'none' }}>
                    <form onSubmit={(e) => CreateGroups(e)}>
                        <div class="form-group row">
                            <div class="col-sm-10">
                                <input type="text" class="form-control" value={groupName} onChange={e => setGroupName(e.target.value)} id="inputEmail" placeholder="Enter group name" />
                                {groupNnError != ''
                                    &&
                                    <span style={{ color: 'red' }}>{groupNnError}</span>
                                }
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-10">
                                <Multiselect
                                    options={allFriendClient}// Options to display in the dropdown
                                    displayValue="firstname"// Property name to display in the dropdown options
                                    showCheckbox={true}
                                    onSelect={onSelect} // Function will trigger on select event
                                    onRemove={onRemove} // Function will trigger on remove event
                                    closeOnSelect={false}
                                    placeholder={"Search..."}
                                />
                                {/* <ReactMultiSelectCheckboxes options={options} /> */}

                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <button type="submit" class="btn btn-primary">Save</button>
                            </div>
                            <div class="col-sm-6">
                                <button type="button" class="btn btn-primary" onClick={() => SetshowGroupForm(!showGroupForm)}>Close</button>
                            </div>
                        </div>
                    </form>
                </div>
                {/* <GroupDetailDisplay /> */}
            </div>

        </>
    )
}

export default EditGroup;
