import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { setUserFlag } from "../../store/actions/setUserFlag";
import { useDispatch } from "react-redux";

const DropDown = () => {

    let history = useHistory();
    const dispatch = useDispatch();

    {/*onClick logout dropdown option then user logout
       and redirect login page
    */}
    const logout = () => {
        localStorage.removeItem("emailId");
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");
        if (localStorage.getItem("emailId") === null) {
            history.push("/login");
        }

    }

    {/*Set flag and other userId 
        or 
        onClick the dropdown option profile then redirect profile component 
    */}
    const setFlag = (userId) => {
        localStorage.setItem('otherId', userId)
        localStorage.setItem('flag', 0)
        dispatch(setUserFlag({ flag: false, otherId: "" }))

        if (history.push(`/profile/${userId}`) !== '/profile/' + userId) {
            history.push(`/profile/${userId}`);
        } else {
            history.push(`${userId}`);
        }
        window.location.reload(false);
    }

    return (
        <>

            <div class="dropdown">
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                    Menu
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item"><Link to={`/profile/${localStorage.getItem('userId')}`} onClick={() => setFlag(localStorage.getItem('userId'))}>Profile</Link></a>
                    <a class="dropdown-item"><Link to={`/create-post`}>Create Post</Link></a>
                    <hr />
                    <a class="dropdown-item" onClick={logout}>LogOut</a>
                </div>
            </div>
        </>
    )
}

export default memo(DropDown);
