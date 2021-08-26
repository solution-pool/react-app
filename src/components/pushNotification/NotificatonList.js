import React, { useEffect, useState,memo } from "react";
import axios from "axios";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Avatar from 'react-avatar';
import {useSelector} from "react-redux";

const NotificationList = ({ dropdownOpen }) => {
    const pushNotificationReducer = useSelector(state => state.pushNotificationReducer);
    const [notifiCount, setNotifiCount] = useState(0);
    const [notifiData, setNotifiData] = useState([]);


    useEffect(() => {
        axios.post(
            process.env.REACT_APP_API_URL + `/getNotificationData`,
            {
                user_id: localStorage.getItem("userId")
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            console.log(response.data);
            setNotifiData(response.data.User);
        }).catch((error) => {
            console.log(error.message);

        });

    }, [localStorage.getItem("userId"), pushNotificationReducer])

    return (
        <>
            <ButtonDropdown isOpen={dropdownOpen} >
                <DropdownToggle caret size="lg" color={'white'} />
                <DropdownMenu >
                    {notifiData.slice(0, 5).map((item) => (
                        <DropdownItem  isOpen={dropdownOpen} key={item.username}>
                            <Avatar size={45} name={item.firstname} round={true}>{item.firstname}</Avatar>  {item.msg}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </ButtonDropdown>
        </>
    )
}

export default memo(NotificationList);





