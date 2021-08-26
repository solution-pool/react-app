import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { getUserAmtDetail,getUserType,getUuserLevelPayBoxStatus } from "../../../store/actions/userAmt";
import { getPhoneNo } from "../../../store/actions/about";
import swal from 'sweetalert';
import GoldMemberPayTypeBox from '../../payment/GoldMemberPayTypeBox';

const UserAmount = () => {
    const dispatch = useDispatch();
    const [tippAct, setTippAct] = useState([]);
    const [userDetail, setUserDetail] = useState([]);
    const [changeMemShip, setChangeMemShip] = useState('');
    const [renUseDetailComp,setRenUseDetailComp] = useState(0);
    const reRenderComReducer = useSelector(state => state.reRenderComReducer);
    const userAmtReducer = useSelector(state => state.userAmtReducer.userAmt);
    const phoneNo = useSelector(state => state.aboutReducer.phoneno);
    const [showPayBox,setShowPayBox] = useState(false);
    const userLevelChange = useSelector((state) => state.userAmtReducer.userLevelChange);
    console.log("userLevelChange",userLevelChange);


    useEffect(() => {
        dispatch(getUserAmtDetail())
    }, [reRenderComReducer.countAmt])

    useEffect(() => {
        console.log("userAmtReducer123",userLevelChange)
        axios.get(
            process.env.REACT_APP_API_URL + `/getUserById/${localStorage.getItem("userId")}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            console.log("userAmtReducer123", response.data.User.user_type);
            localStorage.setItem('userType',response.data.User.user_type)
            dispatch(getUserType(response.data.User.user_type));
            setUserDetail(response.data.User.user_type);
        }).catch((error) => {
            console.log(error.message);
        });
    }, [userLevelChange])

    const openPopup = (e, userType) => {
        e.preventDefault();
        if(userType === 0){
            setShowPayBox(true);
            dispatch(getUuserLevelPayBoxStatus(true))
        }
    }

    console.log("userAmtReducer",userAmtReducer);
    return (
        <React.Fragment>
           {showPayBox && <GoldMemberPayTypeBox showPayBox={showPayBox}/>}
            { userDetail == 1 ?
               <div id="content" style={{ width: '260px',color:'#007bff' }}>
                   <p><strong>Gold memebership</strong></p>
                   
                </div>
                :
                <a href="#" onClick={(e) => openPopup(e, userDetail)}>
                    Click here to update into gold member.</a>
            }
            { userAmtReducer.hasOwnProperty('UserAccountDetails') &&
                userAmtReducer.UserAccountDetails.allTriptadePoints > 0 &&
                <div id="content" style={{ width: '260px' }}>tripAmount
                    <p><strong>{userAmtReducer.UserAccountDetails.allTriptadePoints.toFixed(2)}Points.</strong></p>
                </div>
            }
        </React.Fragment>
    )
}

export default UserAmount;
