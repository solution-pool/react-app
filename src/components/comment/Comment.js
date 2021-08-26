import React, { useState, useEffect, useRef, memo } from "react";
import { useHistory } from "react-router-dom";
import ContentLoader from "react-content-loader";
import axios from 'axios';
import Loader from './../loader/Loader';
import htmlParser from 'react-html-parser';
import { Player } from 'video-react';
import CommentReply from './CommentReplys';
import CommentReplyOfReplys from "./CommentReplyOfReplys";
import CreateComment from "./CreateComment";
import Header from './../header/Header';
import { reRenderCommment } from "../../store/actions/reRenderComponent";
import { useSelector, useDispatch } from "react-redux";
import Avatar from 'react-avatar';
import { Link } from "react-router-dom";
import BountyComment from '../bountyComment/BountyComment';

const Comment = (props) => {
    let likePostId = [];
    let dislikePostId = [];
   
    const reRenderComReducer = useSelector(state => state.reRenderComReducer);
    console.log("reRenderComReducer",reRenderComReducer)
    const dispatch = useDispatch();
    const history = useHistory();
    const [alreadyLikeId, setAlreadyLikeId] = useState([]);
    const [alreadyDisLikeId, setAlreadyDisLikeId] = useState([]);
    const [loginUserId, setLoginUserId] = useState(0);
    const [loaderStatus, setLoaderStatus] = useState(true);
    const [storePostData, setStorePostData] = useState([]);
    const [like, setLike] = useState(0);
    const [dislike, setDisLike] = useState(0);
    const [likeStatus, setLikeStatus] = useState(0);
    const [likePostsId, setLikePostsId] = useState([]);
    const [disLikePostsId, setDisLikePostsId] = useState([]);
    const [checkLike, setCheckLike] = useState(0);
    const [checkDisLike, setCheckDiskLike] = useState(0);
    const [startCallApi, setStartCallApi] = useState(1);

    const [comments, setComments] = useState('')
    const [viewComments, setViewComment] = useState([]);
    const [showCommentBtn, setShowCommentBtn] = useState('view comment');
    const [renderComText, setRenderComText] = useState(0);

    const [replys, setReplys] = useState('')
    const [commentReplyBoxView, setCommentReplyBoxView] = useState(0)
    const [replyOfReplyBoxView, setReplyOfReplyBoxView] = useState(-1);
    const [commentAllReplys, setCommentAllReplys] = useState([]);
    const [pushPrevNextReply, setPushPrevNextReply] = useState([]);
    const [pushPrevNextReplyOfReply, setPushPrevNextReplyOfReply] = useState([]);


    {/*Get particular post according to postId*/}
    useEffect(() => {
        if (localStorage.getItem("userId") === null) {
            history.push("/login");
        } else {
            if (localStorage.getItem("postId") != null) {
                axios.get(
                    process.env.REACT_APP_API_URL + "/getSinglePosts/" + localStorage.getItem("postId"),
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                    .then((response) => {
                       
                        setStorePostData(response.data.posts);
                        if (response.data.posts.length === 0) {
                            setLoaderStatus(false);
                        } else {
                            setLoaderStatus(false);
                        }
                    })
                    .catch((error) => {
                        console.log(error.message);

                    });
            }
        }
    }, [like, dislike, renderComText]);

    {/*create like of post*/}
   
    const hangleLike = (e, postid, nlvalue) => {

        e.preventDefault();
     
        if (localStorage.getItem("userId") == null) {
            history.push("/login");
        } else {
            setLoginUserId(localStorage.getItem("userId"));
            setCheckLike(1);
            setCheckDiskLike(0);
            axios.post(
                process.env.REACT_APP_API_URL + "/createLike",
                {
                    npostid: postid,
                    nuserid: localStorage.getItem("userId"),
                    nlvalue: nlvalue == 1 ? 0 : 1,
                    bactive: 1
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                setLikeStatus(response.data.statusCode);
                setStartCallApi(1);
                setCheckLike(postid);
                setLike(like + 1);
            })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    }

    {/*create dislike of post*/}
    const hangleUnLike = (e, postid, nlvalue) => {
        e.preventDefault();
        if (localStorage.getItem("userId") == null) {
            history.push("/login");
        } else {
            setCheckLike(0);
            setCheckDiskLike(1);
            axios.post(
                process.env.REACT_APP_API_URL + "/createDislike",
                {
                    npostid: postid,
                    nuserid: localStorage.getItem("userId"),
                    nlvalue: nlvalue == -1 ? 0 : -1,
                    bactive: 1
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                setStartCallApi(1);
                setCheckDiskLike(postid);
                setDisLike(dislike + 1);
            }).catch((error) => {
                console.log(error.message);
            });
        }
    }

    {/*Get post likes*/}
    useEffect(() => {
        axios.get(
            process.env.REACT_APP_API_URL + "/getlikes",
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                setLikePostsId(response.data.likesDetails);
            })
            .catch((error) => {
                console.log(error.message);

            });
    }, [like, storePostData]);

    {/*Get post dislike*/}
    useEffect(() => {
        axios.get(
            process.env.REACT_APP_API_URL + "/getdislikes",
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                setDisLikePostsId(response.data.likesDetails);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [dislike, storePostData]);

    {/*check user already like post or not*/}
    useEffect(() => {
        const alreadyLikePostIds = likePostsId.map(likesVal => {
            if (likesVal.nuserid == localStorage.getItem("userId") && likesVal.nlvalue == 1) {
                return likePostId = likesVal.npostid;
            }
        })
        setAlreadyLikeId(alreadyLikePostIds);
    }, [likePostsId]);

    {/*check user already dislike post or not*/}
    useEffect(() => {
        const alreadyDisLikePostIds = disLikePostsId.map(likesVal => {
            if (likesVal.nuserid == localStorage.getItem("userId") && likesVal.nlvalue == -1) {
                return dislikePostId = likesVal.npostid;
            }
        })
        setAlreadyDisLikeId(alreadyDisLikePostIds)
    }, [disLikePostsId]);

    {/*re-call post api*/}
    useEffect(() => {
        setRenderComText(renderComText + 1);
    }, [reRenderComReducer.counter,reRenderComReducer.bountyComp])

    {/*Create reply of comment*/}
    const createReply = (e, postId, commentId, replyId) => {
        e.preventDefault();

        axios.post(
            process.env.REACT_APP_API_URL + "/createReply/" + commentId,
            {
                npostid: postId,
                nuserid: localStorage.getItem("userId"),
                replymessage: replys,
                replyid: replyId,
                bactive: 1
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            setReplys('');
            setRenderComText(renderComText + 1);
            setComments('');
        })
            .catch((error) => {
                console.log(error.message);
            });
    }

    {/*Get all replays of comment*/}
    const showReplyOfreplyData = (commentId, replyid) => {
        axios.post(
            process.env.REACT_APP_API_URL + "/getRplies",
            {
                replyid: replyid,
                commentId: commentId
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {

            setRenderComText(renderComText + 1);
            setCommentAllReplys(response.data.allReplies);
            pushPrevNextReply.push(response.data.allReplies);
            const data = pushPrevNextReply.map((value, index) => (
                value.map((value1, index1) => (
                    pushPrevNextReplyOfReply.push(value1)
                ))
            ));
            const jsonObject = pushPrevNextReplyOfReply.map(JSON.stringify);
            const uniqueSet = new Set(jsonObject);
            const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
            setCommentAllReplys(uniqueArray);
        }).catch((error) => {
            console.log(error.message);
        });
    }

    {/*Get all comment according to postId*/}
    const viewComment = (e, cpostId) => {
        axios.get(
            process.env.REACT_APP_API_URL + "/getSingleComment/" + cpostId,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                setViewComment(response.data.comment);
                setRenderComText(renderComText + 1);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    {/*On click the view comment button display the all comments*/}
    const setShowComment = (e) => {
        setRenderComText(renderComText + 1);
        setShowCommentBtn(showCommentBtn == 'view comment' ? 'hide comment' : 'view comment');
    }

    {/*Display all reply of particular comment*/}
    const replyBoxView = (comment_id) => {
        setReplys('');
        setCommentReplyBoxView(comment_id);
        setReplyOfReplyBoxView(-1);
    }

    {/*Display the reply component*/}
    const replyOfreplyBoxView = (reply_id) => {
        setReplys('');
        setReplyOfReplyBoxView(reply_id);
        setCommentReplyBoxView(0);
    }

    console.log("storePostData",storePostData)
    return (
        
        <>
            <Header />
            <div class="container-fluid">
                <div className="row" >
                    <div class="col-lg-12 h-100 d-flex justify-content-center align-items-center mt-4">

                        <div class="panel_form panel panel-default">
                         
                            {storePostData.length == 0 ? <Loader /> : storePostData.map((value, index) => (
                                <div class=" row panel-content mt-4" key={value.nid}>

                                    <div class="card col-lg-12" style={{ width: '800px' }}>
                                        <p class="card-text" style={{ marginLeft: '10px' }}>
                                            <small class="text-muted">
                                                <a href="#" style={{ color: 'black' }}>

                                                    {value.nisAnonymous == 1 ? <img src="https://avatar-ssl.xboxlive.com/avatar/davidvkimball/avatarpic-l.png" alt="Avatar" style={{ borderRadius: '50%', width: '20px' }} />
                                                        : <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="Avatar" style={{ borderRadius: '50%', width: '20px' }} />
                                                    }
                                                &nbsp;
                                                {value.nisAnonymous == 1 ? 'Anonymous User' : value.username}
                                                </a>&nbsp;&nbsp;&nbsp;


                                                {
                                                    new Date().getHours() - new Date(value.created_at).getHours() < 1 ? 'Now' : new Date().getHours() - new Date(value.created_at).getHours() + ' ' + 'hours ago'
                                                }
                                            </small>
                                        </p>
                                        <h6 style={{ marginLeft: '10px' }}>{value.vtitle}</h6>
                                        {value.vtype == 'text' ?
                                            <div >
                                                <p class="text-break" style={{ marginLeft: '10px' }}>{htmlParser(value.vdesc) != '' ? htmlParser(value.vdesc) : ''}</p>
                                            </div> :
                                            value.vmedia.split(',').map(value => (
                                                value.match(/[^/]+(jpg|png|gif|jfif)$/) != null
                                                    ?
                                                    value.length > 0 &&
                                                    <img src={value} alt='images' style={{ width: '500px' }} />
                                                    :
                                                    value.length > 0 &&
                                                    <Player>
                                                        <source src={value} />
                                                    </Player>
                                            ))

                                        }
                                        {value.isBounty === 0 ?
                                            <div class="card-body">
                                                <p class="card-text">
                                                    <small class="text-muted" key={value.nid} id={'likeId' + value.nid}>
                                                        {

                                                            alreadyLikeId.includes(value.nid) == true && localStorage.getItem("userId").length != 0 ?
                                                                <i class="fa fa-thumbs-o-up"
                                                                    aria-hidden="true" title="I like this"
                                                                    onClick={(e) => hangleLike(e, value.nid, 1)}
                                                                    style={{ fontSize: '20px', cursor: 'pointer', color: alreadyLikeId.includes(value.nid) == true ? '#065fd4' : 'black' }} >
                                                                    {value.likeCount}</i>
                                                                :
                                                                <i class="fa fa-thumbs-o-up"
                                                                    aria-hidden="true" title="I like this"
                                                                    onClick={(e) => hangleLike(e, value.nid, 0)}
                                                                    style={{ fontSize: '20px', cursor: 'pointer', color: 'black' }} >{value.likeCount}
                                                                </i>
                                                        }
                                                        {/* {
                                                            alreadyDisLikeId.includes(value.nid) == true && localStorage.getItem("userId").length != 0 ?
                                                                <i class="fa fa-thumbs-o-down"
                                                                    aria-hidden="true" title="I like this"
                                                                    onClick={(e) => hangleUnLike(e, value.nid, -1)}
                                                                    style={{ fontSize: '20px', cursor: 'pointer', color: alreadyDisLikeId.includes(value.nid) == true ? '#065fd4' : 'black' + localStorage.getItem("userId") }} >
                                                                    {value.disLikeCount}</i>
                                                                :
                                                                <i class="fa fa-thumbs-o-down"
                                                                    aria-hidden="true" title="I like this"
                                                                    onClick={(e) => hangleUnLike(e, value.nid, 0)}
                                                                    style={{ fontSize: '20px', cursor: 'pointer', color: 'black' }} >{value.disLikeCount}</i>
                                                        } */}

                                                        <span>
                                                            <i class="fa fa-comment"></i>comment
                                                        </span>&nbsp;&nbsp;
                                                        <span>
                                                            {/* <i class="fa fa-gift"></i>Give Award
                                                        </span>&nbsp;&nbsp;
                                                        <span>
                                                        <i class="fa fa-share"></i>Share */}
                                                        </span>
                                                        &nbsp;&nbsp;
                                                        <span><i class="fa fa-calendar"></i>
                                                            {
                                                                new Date(value.created_at).toLocaleDateString()
                                                            }
                                                        </span>
                                                    </small>
                                                </p>
                                            </div>
                                            : ''
                                        }
                                        <CreateComment
                                            username={value.username}
                                            value={value.nid}
                                        />

                                        {value.isBounty === 0 ?
                                            <div className="form-group" style={{ float: 'right' }} >
                                                <button className="btn btn-success" style={{ background: '#32658a' }} type="submit" onClick={(e) => setShowComment(e)}>{showCommentBtn}</button>
                                            </div>
                                            : ''
                                        }
                                        {value.isBounty === 0 ?
                                            <div class="panel_form panel panel-default" style={{ float: 'left', display: showCommentBtn == 'view comment' ? 'none' : 'block' }} >
                                                {
                                                    value.commentData.map(commentDetail => (
                                                        <div style={{ marginBottom: '20px' }}>

                                                            <span className="commenet">{commentDetail.username}   {new Date(commentDetail.created_at).toLocaleDateString()}
                                                                <p style={{ marginBottom: '0px' }}>{commentDetail.comments}</p>
                                                                <span className="commenet" style={{ float: 'left', color: 'rgb(167, 154, 154)' }} onClick={() => showReplyOfreplyData(commentDetail.nid, 0)} >View More</span>
                                                                <span className="commenet" style={{ color: 'rgb(167, 154, 154)', paddingLeft: '10px' }} onClick={() => replyBoxView(commentDetail.nid)} >Reply</span>&nbsp;

                                                        </span>
                                                            <CommentReply
                                                            
                                                                commentReplyBoxView={commentReplyBoxView}
                                                                commentDetailNid={commentDetail.nid}
                                                                onSubmitCommentReply={(e) => createReply(e, value.nid, commentDetail.nid, '0')}
                                                                replysLen={replys.length}
                                                                setReplys={(e) => setReplys(e.target.value)}
                                                                replys={replys}
                                                            />
                                                            <br />
                                                            {commentAllReplys.map(replyDetail => (

                                                                replyDetail.comment_id == commentDetail.nid ?
                                                                    <span>
                                                                        <br />
                                                                        <span className="commenet" style={{ paddingLeft: '30px', fontSize: '15px' }}>{replyDetail.username}   {new Date(replyDetail.created_at).toLocaleDateString()}</span>
                                                                        <p style={{ paddingLeft: '40px', marginBottom: '0px' }}>{replyDetail.replymessage} </p>
                                                                        <span className="commenet" style={{ float: 'left', color: 'rgb(167, 154, 154)', paddingLeft: '40px', fontSize: '14px' }} onClick={() => showReplyOfreplyData(commentDetail.nid, replyDetail.nid)} >View More</span>&nbsp;
                                                                    <span className="commenet" style={{ float: 'left', color: 'rgb(167, 154, 154)', paddingLeft: '10px', fontSize: '14px' }} onClick={() => replyOfreplyBoxView(replyDetail.nid)}>Reply</span>
                                                                        <CommentReplyOfReplys
                                                                       
                                                                            replyOfReplyBoxView={replyOfReplyBoxView}
                                                                            replyDetailNid={replyDetail.nid}
                                                                            commentDetailNid={commentDetail.nid}
                                                                            replys={replys}
                                                                            setReplys={(e) => setReplys(e.target.value)}
                                                                            onSubmitCreateReply={(e) => createReply(e, value.nid, commentDetail.nid, replyDetail.nid)}
                                                                            replysLen={replys.length}
                                                                        />
                                                                    </span>
                                                                    : ''
                                                            ))}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            :
                                            value.commentData.map(commentDetail => (
                                                <BountyComment
                                                commentDetail={commentDetail}
                                                loginUserId = {value.nuserid}
                                                commendId = {value.id}
                                                bountyAmt = {value.post_amount}
                                                questId = {value.nid}
                                                bountyAcceptStatus = {value.bountyAcceptStatus}
                                                
                                                />
                                            ))

                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default memo(Comment);