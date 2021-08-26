import React, { useEffect, useState } from 'react';
import './../../../App.css';
import { useSelector, useDispatch } from "react-redux";
import { getPhoneNo } from "../../../store/actions/about";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const UserLikePostCount = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const phoneNo = useSelector(state => state.aboutReducer.phoneno);
    console.log("phoneNo", phoneNo)
    let { id: otherUserId } = useParams();
    useEffect(() => {
        dispatch(getPhoneNo());
    }, []);

    const ClientTabs = (tabName) => {
        history.push(tabName)
    }
    return (
        <React.Fragment>
            <div className="card mt-4" >
                <div className="card-header bg-dribbble content-center bg-primary">
                    <i className="fab fa-dribbble icon text-primary my-4 display-4"></i>
                </div>
                <div className="card-body row text-center">
                    <div className="col-4">
                        <div className="text-value-xl">{phoneNo != undefined && phoneNo.User.clientCount}</div>
                        {otherUserId == localStorage.getItem('userId') ?
                            <div className="text-uppercase text-muted small" style={{ cursor: 'pointer' }} onClick={() => ClientTabs('#Clients')}>Clients</div>
                            :
                            <div className="text-uppercase text-muted small" >Clients</div>
                        }
                        {/* <Link to={history.push('#Clients')} class="item-author text-color" data-abc="true">
                            <div className="text-uppercase text-muted small">Clients</div>
                        </Link> */}
                    </div>
                    <div className="col-4">
                        <div className="text-value-xl">{phoneNo != undefined && phoneNo.User.friendCount}</div>
                        {otherUserId == localStorage.getItem('userId') ?
                            <div className="text-uppercase text-muted small" style={{ cursor: 'pointer' }} onClick={() => ClientTabs('#Friends')}>Friends</div>
                            :
                            <div className="text-uppercase text-muted small">Friends</div>
                        }
                    </div>
                    <div className="col-4">
                        <div className="text-value-xl">{phoneNo != undefined && phoneNo.User.likeCount}</div>
                        {otherUserId == localStorage.getItem('userId') ?
                            <Link to={`/liked-post/${localStorage.getItem("userId")}`} class="item-author text-color" data-abc="true">
                                <div className="text-uppercase text-muted small">Likes</div>
                            </Link>
                            :
                            <div className="text-uppercase text-muted small">Likes</div>
                        }
                    </div>
                  
                    <div className="col-4">
                        <div className="text-value-xl">{phoneNo != undefined && phoneNo.User.postCount}</div>
                        {otherUserId == localStorage.getItem('userId') ?
                            <div className="text-uppercase text-muted small" style={{ cursor: 'pointer' }} onClick={() => ClientTabs('#Post')}>Posts</div>
                            :
                            <div className="text-uppercase text-muted small">Posts</div>
                        }
                    </div>
                    <div className="col-4">
                        <div className="text-value-xl">{phoneNo != undefined && phoneNo.User.postDraft}</div>
                        {otherUserId == localStorage.getItem('userId') ?
                            <Link to={`/draft-post`} class="item-author text-color" data-abc="true">
                                <div className="text-uppercase text-muted small">Drafts</div>
                            </Link>
                            :
                            <div className="text-uppercase text-muted small">Drafts</div>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UserLikePostCount;