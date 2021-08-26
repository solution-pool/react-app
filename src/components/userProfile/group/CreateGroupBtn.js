import React, { useState, useEffect } from "react";
import './../../../App.css';
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { getGroupNmList,showHideGpForm } from "../../../store/actions/group";
import Badge from 'react-bootstrap/Badge';



const CreateGroupBtn = () => {

    const [showGroupForm, SetshowGroupForm] = useState(false);
    const dispatch = useDispatch();
    const statusGpForm = useSelector(state => state.groupReducer.status);
   
    const showHideCreateGroFrom = (status)=>{
        dispatch(showHideGpForm(status))
    }
    return (
        <>
            <Badge pill variant="primary"
                onClick={() => showHideCreateGroFrom(!statusGpForm)}
                style={{ fontSize: '20px', marginBottom: '20px' }}>
                <i class="fa fa-plus-circle"></i> {'Create Group'}
            </Badge>
        </>
    )
}

export default CreateGroupBtn;
