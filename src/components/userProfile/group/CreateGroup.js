import React, { useState, useEffect,useRef } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import options from "./data";
import { Multiselect } from "multiselect-react-dropdown";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Badge from 'react-bootstrap/Badge';
import GroupDetailDisplay from './GroupDetailDisplay';
import CreateGroupBtn from './CreateGroupBtn';
import './../../../App.css';
import axios from "axios";
import Loader from './../../loader/Loader';
import { reRenderUserAmt,reRenderGroupComp } from "../../../store/actions/reRenderComponent";
import {useSelector,useDispatch } from "react-redux";
import { getGroupNmList,showHideGpForm } from "../../../store/actions/group";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import swal from 'sweetalert';


const CreateGroup = () => {
    const [selectedMembIds, setSelectedMembIds] = useState([]);
    const [countSelectedMems,setCountSelectedMems] = useState(0);
    const [groupName, setGroupName] = useState();
    const [groupNnError, setgrNmError] = useState('');
    const [allFriendClient, setAllFriendClient] = useState([]);
    const [removedMembIds, setRemovedMembIds] = useState([]);
    
    const [loaderStatus, setLoaderStatus] = useState(true);
    const [reRenderComp, setReRenderComp] = useState(0);
    const [showGroupForm, SetshowGroupForm] = useState(false);
    const [zipCode,setZipCode] = useState(0);
    const dispatch  = useDispatch();
    const multiselectRef =  useRef();
    const statusGpForm = useSelector(state => state.groupReducer.status);
    {/*Get group members ids*/}
    const onSelect = (selectedList, selectedItem) => {
        const allClientFriIds = selectedList.map(function (value) {
            return value.id;
        });

        setCountSelectedMems(multiselectRef.current.getSelectedItemsCount());
        setSelectedMembIds(allClientFriIds);
    }
    
    {/*Get remove group members id*/}
    const onRemove = (selectedList, removedItem) => {
        const removeClientFriIds = [removedItem].map(function (value) {
            return value.id;
        });

        setCountSelectedMems(multiselectRef.current.getSelectedItemsCount());
        setRemovedMembIds(removeClientFriIds);
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
                dispatch(showHideGpForm(false))
                setReRenderComp(reRenderComp + 1);
                // NotificationManager.success(`Members group created successfully.`, '', 3000);
                swal("Group created!", "Group created successfully.", "success");
                window.location.reload();
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
            zip_code : zipCode
        },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            console.log("responseData",response.data.userFriendList);
            setAllFriendClient(response.data.userFriendList);
            
        }).catch((error) => {
            // console.log(error.message);
        });
    }, [zipCode])

    const showHideCreateGroFrom = (status)=>{
        dispatch(showHideGpForm(status))
        window.location.reload();
    }

  {/*search members by zipcode*/}
  const searchData = (codeDigit)=>{
    if(!isNaN(codeDigit) && codeDigit.length == 5){
      setZipCode(codeDigit);
    }else{
        if(codeDigit.length > 5){
            setZipCode(codeDigit);
        }else{
            setZipCode('');
        }
        
    }
  }
    return (

        <>
            <div class="bs-example">
                <div style={{ display: statusGpForm ? 'block' : 'none' }}>
                    <form onSubmit={(e) => CreateGroups(e)}>
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <input type="text" class="form-control" value={groupName} onChange={e => setGroupName(e.target.value)} id="inputEmail" placeholder="Enter group name" />
                                {groupNnError != ''
                                    &&
                                    <span style={{ color: 'red' }}>{groupNnError}</span>
                                }
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <Multiselect
                                    options={allFriendClient}// Options to display in the dropdown
                                    displayValue="name"// Property name to display in the dropdown options
                                    showCheckbox={true}
                                    onSelect={onSelect} // Function will trigger on select event
                                    onRemove={onRemove} // Function will trigger on remove event
                                    closeOnSelect={false}
                                    placeholder={"Search..."}
                                    ref={multiselectRef}
                                    onSearch = {searchData}
                                />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <button type="submit" class="btn btn-primary" disabled={countSelectedMems > 0 && groupName != '' ? '' : 'disabled'}>Save</button>
                            </div>
                            <div class="col-sm-6">
                                <button type="button" class="btn btn-primary"  onClick={() => showHideCreateGroFrom(!statusGpForm)}>Close</button>
                            </div>
                        </div>
                    </form>
                </div>
                <GroupDetailDisplay />
            </div>

        </>
    )
}

export default CreateGroup;
