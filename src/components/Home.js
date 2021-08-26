import React, { useState, useEffect,memo } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Loader from './loader/Loader';
import htmlParser from 'react-html-parser';
import { Player } from 'video-react';
import Filter from "./filter/Filter";
import Header from './header/Header';
import { useSelector, useDispatch } from "react-redux";
import Badge from 'react-bootstrap/Badge';
import SearchPosts from '../../src/components/post/SearchPosts';
import { searchPostHome } from "../../src/store/actions/postCommunity";
import { reRenderHomeComp, reRenderUserAmt } from "../../src/store/actions/reRenderComponent";
import { checkPostExpiry} from "../utility"
import PaymentConformation from '../../src/components/payment/PaymentConformation';
import SharePostWithFriendModal from "../components/modal/SharePostWithFriendModal";

import {sharePostWithFri} from "../store/actions/sharePostWithFri";

const ViewPost = (props) => {

    let likePostId = [];
    let dislikePostId = [];
    let insertId;

    const history = useHistory();
    const dispatch = useDispatch();
    const [alreadyLikeId, setAlreadyLikeId] = useState([]);
    const [alreadyDisLikeId, setAlreadyDisLikeId] = useState([]);
    const [loaderStatus, setLoaderStatus] = useState(true);
    const [storePostData, setStorePostData] = useState([]);
    const [like, setLike] = useState(0);
    const [dislike, setDisLike] = useState(0);
    const [likePostsId, setLikePostsId] = useState([]);
    const [disLikePostsId, setDisLikePostsId] = useState([]);
    const [status, setStatus] = useState(false);
    const [SharepostId,setPostId] = useState('');
    const [postCreateId,setPostCreateId] = useState('');

    const getPostType = useSelector(state => state.filterPostReducer);
    const getCommName = useSelector(state => state.postCommunityReducer);
    const frdClientDisplay = useSelector((state) => state.sharePostReducer.frdClientDisplay);
    const renderHomeCom = useSelector(state => state.reRenderComReducer);
    

    console.log("frdClientDisplay",renderHomeCom)
    // useEffect(()=>{
    //     axios.put(process.env.REACT_APP_API_URL + `/cronCheck`,
    //     {
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //     .then(response=>{
    //         console.log(response)
    //     }).catch(error=>{
    //         console.log(error)
    //     });
    // },[])
    {/*Get all post*/}
    useEffect(() => {
        // console.log(process.env.REACT_APP_API_URL + `/cronCheck`);
        axios.post(
            process.env.REACT_APP_API_URL + `/getAllPosts/${getPostType == 'undefined' ? '' : getPostType.postType}`, {
            search: getCommName.searchHmPgText,
            user_type: localStorage.getItem('userType') !== '' ? localStorage.getItem('userType') : '',
            user_id: localStorage.getItem('userId')
        },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
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
    }, [like, dislike, getPostType, getCommName,renderHomeCom]);

    {/*create the like of post*/}
    const hangleLike = (e, postid, nlvalue, nuserid, userType,likes_perce) => {
        // e.preventDefault();

        if (localStorage.getItem("userId") === null) {
            history.push("/login");
        } else {
            axios.post(
                process.env.REACT_APP_API_URL + "/createLike",
                {
                    npostid: postid,
                    nuserid: parseInt(localStorage.getItem("userId")),
                    nlvalue: nlvalue == 1 ? 0 : 1,
                    bactive: 0,
                    postnuserid: nuserid,
                    postusertype: userType,
                    likes_percentage : parseInt(likes_perce)
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                dispatch(reRenderUserAmt())
                setLike(like + 1);

            })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    }

    {/*create the dislike of post*/}
    const hangleUnLike = (e, postid, nlvalue) => {
        e.preventDefault();
        if (localStorage.getItem("userId") === null) {
            history.push("/login");
        } else {

            axios.post(
                process.env.REACT_APP_API_URL + "/createDislike",
                {
                    npostid: postid,
                    nuserid: localStorage.getItem("userId"),
                    nlvalue: nlvalue == -1 ? 0 : -1,
                    bactive: 0
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                setDisLike(dislike + 1);

            }).catch((error) => {
                console.log(error.message);
            });
        }
    }

    {/*Get dislike of post*/}
    useEffect(() => {
        axios.get(
            process.env.REACT_APP_API_URL + "/getlikes",
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            setLikePostsId(response.data.likesDetails);
        })
            .catch((error) => {
                console.log(error.message);
            });
    }, [like, storePostData]);

    {/*Get dislike of post*/}
    useEffect(() => {
        axios.get(
            process.env.REACT_APP_API_URL + "/getdislikes",
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            setDisLikePostsId(response.data.likesDetails);
        })
            .catch((error) => {
                console.log(error.message);
            });
    }, [dislike, storePostData]);

    {/*check user already like or not*/}
    useEffect(() => {
        const alreadyLikePostIds = likePostsId.map(likesVal => {
            if (likesVal.nuserid == localStorage.getItem("userId") && parseInt(likesVal.nlvalue) === 1) {
                return likePostId = likesVal.npostid;
            }
        })
        setAlreadyLikeId(alreadyLikePostIds);
    }, [likePostsId]);

    {/*check user already dislike or not*/}
    useEffect(() => {
        const alreadyDisLikePostIds = disLikePostsId.map(likesVal => {
            if (likesVal.nuserid == localStorage.getItem("userId") && parseInt(likesVal.nlvalue) === -1) {
                return dislikePostId = likesVal.npostid;
            }
        })
        setAlreadyDisLikeId(alreadyDisLikePostIds)
    }, [disLikePostsId]);

    {/*Login user click the commnet icon then redireact the commnet section*/}
    const commentShow = (postId,isbountyStatus) => {
        if (localStorage.getItem("userId") === null) {
            history.push("/login");
        }
        if(localStorage.getItem("userId") !== '' && postId !== '' && isbountyStatus == 0) {
            localStorage.setItem("postId", postId)
            history.push("/comment");
        }
        if(localStorage.getItem("userId") !== '' && postId !== '' && isbountyStatus == 1) {
            localStorage.setItem("postId", postId)
            history.push("/comment");
        }
    }

    const handleChange = (status, ct, timer) => {
        setStatus(status ? false : true)
        if (!status) {
            myFunction(status, ct, timer)
        } else {
            myStopFunction(status)
        }
    }

    {/*user click the like icon then change under 10sec like tipptrade point*/}
    const myFunction = (status, ct, timer,e, valueNid, likeNo, valueNuserid, valueUser_type) => {
        let start = ct;

        insertId = setTimeout(() => {
            const second = Math.round(Date.now() / 1000) - start;
            if(second <= 10){
                hangleLike(e, valueNid, likeNo, valueNuserid, valueUser_type)
            }
            localStorage.removeItem("insertId")
            console.log("CHECKDATA","ADD TRIPPTRADE POINT",second,Math.round(Date.now() / 1000),start);
        }, timer);
        localStorage.setItem("insertId", insertId)
    }

    /*stop the like tipptrade point */
    const myStopFunction = (status) => {
        clearTimeout(localStorage.getItem("insertId"));
        console.log("CHECKDATA","NOT ADD TRIPPTRADE POINT");
    }

    //modal functoinality
    const modalOpen = (totalNoOfFriClient,post_id,post_creator_id)=>{
        if(localStorage.getItem("userId") === null) {
            history.push("/login");
        }if(totalNoOfFriClient === 0){
            alert("Oops! No friends found to share this post.Please make some friends.")
        }
        else{
            if(totalNoOfFriClient !== 2){
                setPostId(post_id); 
                
                setPostCreateId(post_creator_id);

                dispatch(sharePostWithFri(true))
            }
        } 
    } 


    console.log("storePostData",storePostData)
    // console.log(parseInt(value.like_percentage) !== "" ? typeof parseInt(value.ike_percentage) : "")
    return (
        <React.Fragment>
            <Header />
            <SharePostWithFriendModal opens={false} post_share_id={SharepostId} post_creator_id={postCreateId}/>
            <div class="container-fluid bodyBg">
                <div className="row" >
                    <div class="col-lg-12 h-100 d-flex justify-content-center align-items-center mt-4">
                        <div class="panel_form panel panel-default">
                            <Filter />
                            {loaderStatus == false && <SearchPosts searchPost={searchPostHome} />}
                            {loaderStatus == true ? <Loader /> : storePostData.length >= 1 ? storePostData.map((value, index) => (
                                <div class=" row panel-content mt-4" key={value.nid}>

                                    <div class="card col-lg-12" style={{ width: '800px' }}>
                                        <p class="card-text" style={{ marginLeft: '10px' }}>
                                        <p class="text-muted" style={{ textAlign: 'left' }}>
                                            <span class="text-muted">
                                                <a href="#" style={{ color: 'black' }}>
                                                    {value.nisAnonymous == 1 ? <img src="https://avatar-ssl.xboxlive.com/avatar/davidvkimball/avatarpic-l.png" alt="Avatar" style={{ borderRadius: '50%', width: '20px' }} />
                                                        : <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="Avatar" style={{ borderRadius: '50%', width: '20px' }} />
                                                    }
                                                &nbsp;
                                                {value.nisAnonymous == 1 ? 'Anonymous User' : value.username}
                                                </a>&nbsp;&nbsp;&nbsp;
                                                {
                                                    new Date().getHours() - new Date(value.create_date).getHours() < 1 ? 'Now' : new Date().getHours() - new Date(value.create_date).getHours() + ' ' + 'hours ago'
                                                }
                                                &nbsp;&nbsp;&nbsp;
                                                {value.share_split_post_status === 'yes' && <span className="mr-4"><i class="fa fa-share"></i>shared</span> }
                                                {
                                                    checkPostExpiry(value.create_date,value.post_expire_time_type,value.post_expiry_time) 
                                                }
                                                {/* {
                                                    subscriptionPostExpiryTime(value.suscription_post_time,value.suscription_post_time_type)
                                                } */}
                                                {/* {share_split_post_status} */}
                                                
                                                {
                                                    parseInt(value.post_type) === 1  || parseInt(value.post_type) === 6 ?
                                                    <div style={{ cursor: 'pointer',float : 'right',marginTop:'5px' }} >
                                                       { value.nuserid === parseInt(localStorage.getItem('userId')) 
                                                            ? ''
                                                            :
                                                            value.post_type == 6 && value.subscribe_post == 'yes' ?
                                                            <div style={{ cursor: 'pointer',float : 'right',marginTop:'5px',background:'pink',fontWeight:'100px' }} >{'Subscribed'}</div>
                                                            :
                                                                <PaymentConformation postAmt = {value.post_amount} post_type = {value.post_type} post_id={value.nid} post_user_id = {value.nuserid} />
                                                        }
                                                    </div>
                                                    :''
                                                }
                                                            
                                            </span>
                                            <span>
                                                    {value.vmedia != '' ? value.isBounty == 1 || value.isSubscribed == 1 ? 
                                                      value.isSubscribed == 1 && value.post_type == 2 || value.post_type == 6 ?
                                                      <>
                                                      {/* {value.subscribe_post === 'no'  &&  <button style={{ cursor: 'pointer',float : 'right',marginTop:'5px' }} type="button" class="btn btn-danger">Get Subscription123</button>} */}
                                                      {value.subscribe_post === 'no'  ?
                                                             value.nuserid === parseInt(localStorage.getItem('userId')) ?
                                                            //  <div style={{ cursor: 'alias',float : 'right',marginTop:'5px' }} >
                                                            //     <Button variant="outlined" color="primary">
                                                            //         Subscription Post
                                                            //     </Button>
                                                            //  </div>
                                                            ''
                                                             :<div style={{ cursor: 'pointer',float : 'right',marginTop:'5px' }} >
                                                                <PaymentConformation postAmt = {value.post_amount} post_type = {value.post_type} post_id={value.nid} post_user_id = {value.nuserid} /></div>
                                                             : value.subscribe_post === 'yes' && <div style={{ cursor: 'pointer',float : 'right',marginTop:'5px',background:'pink',fontWeight:'100px' }} >{'Paid'}</div>}
                                                       </>
                                                    :
                                                    ''
                                                        : ''
                                                        :
                                                        value.isBounty == 1 || value.isSubscribed == 1 ? 
                                                        value.isSubscribed == 1 && value.post_type == 2 || value.post_type == 6 ?
                                                        <>
                                                        {/* <PaymentConformation /> */}
                                                        {
                                                            value.subscribe_post === 'no'  ?
                                                            value.nuserid === parseInt(localStorage.getItem('userId')) ?
                                                            // <div style={{ cursor: 'alias',float : 'right',marginTop:'5px' }} >
                                                            //    <Button variant="outlined" color="primary">
                                                            //    Subscription Post
                                                            //    </Button>
                                                            // </div>
                                                            ''
                                                            :<div style={{ cursor: 'pointer',float : 'right',marginTop:'5px' }} >
                                                                <PaymentConformation postAmt = {value.post_amount} post_type = {value.post_type} post_id={value.nid} post_user_id = {value.nuserid} />
                                                            </div>
                                                             : value.subscribe_post === 'yes' && <div style={{ cursor: 'pointer',float : 'right',marginTop:'5px',background:'pink',fontWeight:'100px' }} >{'Paid'}</div>

                                                        }
                                                         </>
                                                    :
                                                    ''
                                                            : ''
                                                    }
                                                    </span>
                                        </p>
                                       
                                            {
                                                (value.post_type == 2 && value.isBounty == 1) && localStorage.getItem('userId') &&
                                                <>
                                                    <Badge pill style={{ background: '#8000ff', color: '#fff' }}>
                                                        #{'Bounty Post'}
                                                    </Badge>
                                                    &nbsp;&nbsp;
                                                    {value.post_amount != 0 &&
                                                        <Badge pill style={{ background: '#EC407A', color: '#fff' }}>
                                                            ${value.post_amount}
                                                        </Badge>
                                                    }
                                                    
                                                </>
                                            }
                                            {
                                                (value.post_type == 2 && value.isBounty == null) && localStorage.getItem('userId') &&
                                                <>
                                                    <Badge pill variant="info">
                                                        #{'Paid Post'}
                                                    </Badge>
                                                    &nbsp;&nbsp;
                                                    {value.post_amount &&
                                                        <Badge pill style={{ background: '#EC407A', color: '#fff' }}>
                                                            ${value.post_amount}
                                                        </Badge>
                                                    }
                                                
                                              
                                                </>
                                            }
                                            {
                                                value.post_type == 1 && localStorage.getItem('userId') &&
                                                <Badge pill variant="success">
                                                    #{'Free Post'}
                                                </Badge>
                                            }
                                            {
                                                value.post_type == 6 && localStorage.getItem('userId') &&
                                                <Badge pill  style={{backgroundColor:'#ff6666'}}>
                                                    #{'Subscription Post'}
                                                </Badge>
                                            }
                                             &nbsp;&nbsp;
                                             {/* {value.post_type == 6 &&
                                                <Badge pill style={{ background: '#EC407A', color: '#fff' }}>
                                                    ${value.post_amount}
                                                </Badge>
                                            } */}
                                            {
                                                value.share_post_percentage !== null && parseInt(localStorage.getItem('userId')) !== value.nuserid ?  
                                                    <Badge pill  style={{backgroundColor:'rgb(178 232 113)'}}>
                                                      { `If you share this post with your friend then you will get ${value.share_post_percentage}% of this post`}
                                                    </Badge>
                                                : ""
                                               
                                            }
                                        </p>
                                        <h6 style={{ marginLeft: '10px' }}>
                                        { value.post_type == 2 || value.post_type == 6 ?
                                                // value.subscribe_post == "yes" &&
                                            value.vtitle 
                                            :
                                            value.vtitle
                                        }
                                        &nbsp;&nbsp;&nbsp;
                                            { value.post_type == 2 || value.post_type == 6 ?
                                                value.subscribe_post == "yes" || value.subscribe_post == "no" ?
                                                    <Badge pill variant="info">
                                                    #{value.communitie_type}
                                                    </Badge>
                                                    :
                                                    value.nuserid === parseInt(localStorage.getItem('userId')) &&
                                                    <Badge pill variant="info">
                                                    #{value.communitie_type}
                                                    </Badge>
                                                    :
                                                    <Badge pill variant="info">
                                                    #{value.communitie_type}
                                                    </Badge>
                                            }
                                        </h6>
                                        
                                        {value.vtype == 'text' ?
                                            <div >
                                                {/* <p class="text-break line-clamp" style={{ marginLeft: '10px' }}>{htmlParser(value.vdesc) != '' ? htmlParser(value.vdesc) : ''}</p> */}
                                               { value.post_type == 2 || value.post_type == 6 ?
                                               value.nuserid === parseInt(localStorage.getItem('userId')) ?
                                                <p style={{ marginLeft: '10px' }}>{htmlParser(value.vdesc) != '' ? htmlParser(value.vdesc) : ''}</p>
                                                :
                                                value.post_type == 6 ?
                                                <p /* class={value.subscribe_post == "yes" ? "text-break" : "line-clamp"} */ style={{ marginLeft: '10px' }}>{htmlParser(value.vdesc) != '' ? htmlParser(value.vdesc) : ''}</p>
                                                :
                                                <p /*class={value.subscribe_post == "yes" ? "text-break" : "line-clamp" }*/ style={{ marginLeft: '10px' }}>{htmlParser(value.vdesc) != '' ? htmlParser(value.vdesc) : ''}</p>

                                                :
                                                <p class="text-break" style={{ marginLeft: '10px' }}>{htmlParser(value.vdesc) != '' ? htmlParser(value.vdesc) : ''}</p>
                                               }

                                            </div> :
                                            value.post_type == 2 || value.post_type == 6 ?
                                            value.vmedia.split(',').map(values => (
                                                values.match(/[^/]+(jpg|png|gif|jfif)$/) != null
                                                    ?
                                                    values.length > 0 &&
                                                    <div class={value.subscribe_post == "yes" ? "text-break" : "line-clamp" }>
                                                        <img src={values} alt='images' style={{ width: '500px' }} />
                                                    </div>
                                                    :
                                                    values.length > 0 &&
                                                    <div class={value.subscribe_post == "yes" ? "text-break" : "line-clamp" }>
                                                        <Player>
                                                            <source src={values} />
                                                        </Player>
                                                    </div>

                                            ))
                                            :
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

                                        <div class="card-body d-flex justify-content-between">

                                            <p class="card-text mt-5">
                                                <small class="text-muted" key={value.nid} id={'likeId' + value.nid}>
                                                {/* <i class="fa fa-thumbs-o-up"
                                                                aria-hidden="true" title="I like this"
                                                                onClick={(e) => handleChange(status,Math.round(Date.now() / 1000),10000,hangleLike(e, value.nid, 1, value.nuserid, value.user_type))}
                                                                style={{ fontSize: '20px', cursor: 'pointer', color: status ? '#065fd4' : 'black' }} >
                                                                </i> */}
                                                    {
                                                        alreadyLikeId.includes(value.nid) == true && parseInt(localStorage.getItem("userId")).length !== 0 ?
                                                            <i class="fa fa-thumbs-o-up"
                                                                aria-hidden="true" title="I like this"
                                                                onClick={(e) => hangleLike(e, value.nid, 1, value.nuserid, value.user_type)}
                                                                // onClick={(e) => handleChange(status,Math.round(Date.now() / 1000),10000,hangleLike(e, value.nid, 1, value.nuserid, value.user_type))}

                                                                style={{ fontSize: '20px', cursor: 'pointer', color: alreadyLikeId.includes(value.nid) === true ? '#065fd4' : 'black' }} >
                                                                {value.likeCount}</i>
                                                            :
                                                            <i class="fa fa-thumbs-o-up"
                                                                aria-hidden="true" title="I like this"
                                                                onClick={(e) => hangleLike(e, value.nid, 0, value.nuserid, value.user_type,value.like_percentage !== null ? value.like_percentage : "" )}
                                                                // onClick={(e) => handleChange(status,Math.round(Date.now() / 1000),10000,hangleLike(e, value.nid, 0, value.nuserid, value.user_type))}
                                                                style={{ fontSize: '20px', cursor: 'pointer', color: 'black' }} >{value.likeCount}
                                                            </i>
                                                    }
                                                    {/* {
                                                        alreadyDisLikeId.includes(value.nid) == true && parseInt(localStorage.getItem("userId")).length !== 0 ?
                                                            <i class="fa fa-thumbs-o-down"
                                                                aria-hidden="true" title="I like this"
                                                                onClick={(e) => hangleUnLike(e, value.nid, -1)}
                                                                style={{ fontSize: '20px', cursor: 'pointer', color: alreadyDisLikeId.includes(value.nid) === true ? '#065fd4' : 'black' + localStorage.getItem("userId") }} >
                                                                {value.disLikeCount}</i>
                                                            :
                                                            <i class="fa fa-thumbs-o-down"
                                                                aria-hidden="true" title="I like this"
                                                                onClick={(e) => hangleUnLike(e, value.nid, 0)}
                                                                style={{ fontSize: '20px', cursor: 'pointer', color: 'black' }} >{value.disLikeCount}</i>
                                                    } */}
                                                   {value.isBounty == 1
                                                   ?
                                                    <span className="mr-4" onClick={(e) => commentShow(value.nid,value.isBounty)}><i class="fa fa-comment"></i>Bounty reply</span>
                                                    :
                                                    <span className="mr-4" onClick={(e) => commentShow(value.nid,0)}><i class="fa fa-comment"></i>comment</span>
                                                   }
                                                   {/* {value.share_post_percentage !== null &&  parseInt(localStorage.getItem('userId')) !== value.nuserid  && <span className="mr-4" onClick={modalOpen}><i class="fa fa-share"></i>share</span>} */}
                                                   {/* {
                                                   (value.like_percentage !== null || value.paid_percentage  !== null || value.collab_percentage ) &&  parseInt(localStorage.getItem('userId')) !== value.nuserid  
                                                   ? frdClientDisplay.length !== 0 ? parseInt(value.post_type) === 1 || parseInt(value.post_type) === 0 && <span className="mr-4" onClick={()=>modalOpen(1,value.nid,value.nuserid)}><i class="fa fa-share"></i>share</span>
                                                   :
                                                   parseInt(value.post_type) === 1 || parseInt(value.post_type) === 0 &&
                                                   <span className="mr-4" ><i class="fa fa-share" onClick={()=>modalOpen(0,value.nid,value.nuserid)}></i>share</span>
                                                   :
                                                   localStorage.getItem('userId') == null 
                                                   ? parseInt(value.post_type) === 1 || parseInt(value.post_type) === 0 && <span className="mr-4" onClick={()=>modalOpen(2,value.nid,value.nuserid)}><i class="fa fa-share"></i>share</span>
                                                   : frdClientDisplay.length !== 0 ? parseInt(value.post_type) === 1 || parseInt(value.post_type) === 0 && <span className="mr-4" onClick={()=>modalOpen(1,value.nid,value.nuserid)}><i class="fa fa-share"></i>share</span>
                                                   :
                                                   <span className="mr-4" onClick={()=>modalOpen(0,value.nid,value.nuserid)}><i class="fa fa-share"></i>share</span>
                                                } */}
                                                {
                                                   (parseInt(value.post_type) === 1 || parseInt(value.post_type) === 0) &&  parseInt(localStorage.getItem('userId')) !== value.nuserid  
                                                   ? 
                                                   <span className="mr-4" onClick={()=>modalOpen(1,value.nid,value.nuserid)}><i class="fa fa-share"></i>share</span>
                                                   :
                                                   ""
                                                //    <span className="mr-4" onClick={()=>modalOpen(0,value.nid,value.nuserid)}><i class="fa fa-share"></i>share=B={parseInt(value.post_type)}</span>
                                                }

                                                    <span><i class="fa fa-calendar"></i>
                                                        {
                                                            new Date(value.create_date).toLocaleDateString()
                                                        }
                                                    </span>

                                                </small>
                                            </p>
                                           {/* {parseInt(localStorage.getItem('userId')) !== value.nuserid && */}
                                                <div style={{ 
                                                    border: value.like_percentage !== null || value.paid_percentage !== null || value.collab_percentage !== null ? "2px solid green" : "",
                                                    borderRadius:value.like_percentage !== null || value.paid_percentage !== null || value.collab_percentage !== null ? "25px" :"",
                                                    padding: value.like_percentage !== null || value.paid_percentage !== null || value.collab_percentage !== null ?"8px" : "",
                                                    height: value.like_percentage !== null || value.paid_percentage !== null || value.collab_percentage !== null ?"44px" : "",
                                                    marginTop: value.like_percentage !== null || value.paid_percentage !== null || value.collab_percentage !== null ?"39px" : "",
                                                }}>
                                                {/* }}> */}
                                                {value.like_percentage !== null &&
                                                        <span class="card-text" 
                                                        style={{
                                                            borderRadius: "2px solid black",
                                                            height: "44px",
                                                            marginTop: "39px",
                                                            fontSize:"13px"
                                                            }}>
                                                            Likes : {value.like_percentage}%
                                                        </span>
                                                    }
                                                    {/* <br/> */}
                                                    &nbsp;&nbsp;
                                                    {value.paid_percentage !== null &&
                                                        <span class="card-text" style={{fontSize:"13px"}}>
                                                            Paid : {value.paid_percentage}%
                                                        </span>
                                                    }
                                                    {/* <br/> */}
                                                    &nbsp;&nbsp;
                                                    {value.collab_percentage !== null &&
                                                        <span class="card-text" style={{fontSize:"13px"}}>
                                                            Collab : {value.collab_percentage}%
                                                        </span>
                                                    }
                                                    <br/>
                                                </div>
                                            {/* } */}
                                            {/* <div>
                                                <h6>Mahesh kumar</h6>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            ))
                                :
                                <div class="row mt-4">
                                    <div class="col-12 mx-auto">
                                        <div class="text-center" style={{ fontWeight: '100px', fontSize: '30px' }}>
                                            POST NOT FOUND
                                    </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default memo(ViewPost);
