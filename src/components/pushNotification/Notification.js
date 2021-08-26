import React, { useEffect, useState, memo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import NotificatonList from "./NotificatonList";

const Notification = () => {
  const pushNotificationReducer = useSelector(
    (state) => state.pushNotificationReducer
  );
  const [notifiCount, setNotifiCount] = useState(0);
  const [notifiData, setNotifiData] = useState([]);
  const [theme, setTheme] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  {
    /*Get Notification Count*/
  }
  useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_API_URL + `/getNotificationCount`,
        {
          user_id: localStorage.getItem("userId"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setNotifiCount(response.data.User);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [localStorage.getItem("userId"), pushNotificationReducer]);

  {
    /*Notification dropdown hide/show*/
  }
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    updateNotificationStatus();
  };

  {/*Update Notifition status after click the notification icon*/}
  const updateNotificationStatus = () => {
    axios
      .post(
        process.env.REACT_APP_API_URL + `/updateNotificationStatus`,
        {
          user_id: localStorage.getItem("userId"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setNotifiCount(0);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div>
        <div id="ex4" onClick={toggleDropdown}>
          <span
            className="p1 fa-stack fa-2x has-badge"
            data-count={notifiCount}
          >
            <i
              className="p3 fa fa-bell fa-stack-1x xfa-inverse"
              data-count="4b"
            ></i>
          </span>
        </div>
        <NotificatonList dropdownOpen={dropdownOpen} />
      </div>
    </>
  );
};

export default memo(Notification);
