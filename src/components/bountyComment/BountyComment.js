import React, { useState, useEffect, useRef, memo } from "react";
import Avatar from 'react-avatar';
import { Link } from "react-router-dom";
import axios from 'axios';
import { reRenderBountyComp } from "../../store/actions/reRenderComponent";
import { useSelector, useDispatch } from "react-redux";

const BountyComment = ({ commentDetail, loginUserId, commendId, bountyAmt, questId,bountyAcceptStatus }) => {

    const dispatch = useDispatch();

    {/*Accept bounty right information*/}
    const acceptBountyAns = (postId, commId, questionId, ansId, bountyPostAmt,cmtUserId) => {

        axios.post(
            process.env.REACT_APP_API_URL + "/createBounty",
            {
                post_id: postId,
                comment_id: commId,
                bounty_question_user_id: questionId,
                bounty_answer_user_id: ansId,
                amount: bountyPostAmt
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
           console.log("response123",response.status);
           if(response.status && response.status == 201){
              dispatch(reRenderBountyComp())
           }
        }).catch((error) => {
            console.log(error.message);
        });
    }
    return (
        <>
            {commentDetail.nuserid === parseInt(localStorage.getItem('userId'))
                ?
                <>
                    <div style={{ marginBottom: '20px' }}>
                        <div className="row"  >
                            <div className="col-sm-12" >
                                <div className="list list-row block">
                                    <div className="list-item" data-id="19" style={{ background: '#f1f1f1' }}>
                                        <div class="flex wrap">
                                            {commentDetail.username}
                                            &nbsp;&nbsp;
                                            <Link className="item-author text-color" data-abc="true" style={{ fontWeight: 'bolder' }}>
                                                {
                                                    new Date(commentDetail.created_at).toLocaleDateString()
                                                }
                                            </Link>
                                            <div class="item-except text-muted">{commentDetail.comments}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                loginUserId === parseInt(localStorage.getItem('userId'))
                &&
                <>
                    <div style={{ marginBottom: '20px' }}>
                        <div className="row"  >
                            <div className="col-sm-12" >
                                <div className="list list-row block">
                                    <div className="list-item" data-id="19" style={{ background: '#f1f1f1' }}>
                                        <div class="flex wrap">
                                        {commentDetail.username}
                                            &nbsp;&nbsp;
                                            <Link className="item-author text-color" data-abc="true" style={{ fontWeight: 'bolder' }}>
                                                {
                                                    new Date(commentDetail.created_at).toLocaleDateString()
                                                }
                                            </Link>
                                            <div class="item-except text-muted">{commentDetail.comments}</div>
                                        </div>
                                        {bountyAcceptStatus == 0  ?
                                        <div className="no-wrap">
                                        <button
                                            type="button"
                                            class="btn btn-primary"
                                            onClick={() => acceptBountyAns(commentDetail.npostid, commentDetail.nid, questId, commentDetail.nid, bountyAmt,commentDetail.nuserid)}
                                        >
                                            Accept
                                        </button>
                                    </div>
                                        :
                                        ""}
                                        
                                        {/* <div className="no-wrap">
                                            <button 
                                            type="button" 
                                            className="btn btn-danger"
                                            // onclick={() => rejectBountyAns(commentDetail.nuserid, commentDetail.npostid, commentDetail.nid, value.nid,value.id,2)}
                                            >Dispute</button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}


export default memo(BountyComment);