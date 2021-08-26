import React, { useState, useEffect, memo } from "react";
import ContentLoader from "react-content-loader";
import axios from 'axios';
import Loader from '../loader/Loader';
import htmlParser from 'react-html-parser';
import { useHistory, useParams } from "react-router-dom";
import { Player } from 'video-react';
import SimpleImageSlider from "react-simple-image-slider";
import { addCity, getCity, getRelaShip } from "../../store/actions/about";
import { useSelector, useDispatch } from "react-redux";
import Badge from 'react-bootstrap/Badge';
import { Link } from "react-router-dom";
import { getCommunitiesNames, getSingleCommunity, searchPostUsDashBaord } from "../../store/actions/postCommunity";
import { reRenderUserAmt } from "../../store/actions/reRenderComponent";
import { checkPostExpiry,subscriptionPostExpiryTime } from '../../utility';

import { DebounceInput } from 'react-debounce-input';
import SearchPosts from './SearchPosts';

const ViewPost = ({ UserId }) => {
    let likeDetails = [];
    let likePostId = [];
    let dislikePostId = [];
    let likeUserId = [];

    let { id: otherUserId } = useParams();
    const dispatch = useDispatch();

    const [alreadyLikeId, setAlreadyLikeId] = useState([]);
    const [alreadyDisLikeId, setAlreadyDisLikeId] = useState([]);
    const [loaderStatus, setLoaderStatus] = useState(true);
    const [storePostData, setStorePostData] = useState('');
    const [username, setUsername] = useState('');
    const [like, setLike] = useState(0);
    const [dislike, setDisLike] = useState(0);
    const [likeStatus, setLikeStatus] = useState(0);
    const [DisLikeStatus, setDisLikeStatus] = useState(0);
    const [likeDisabled, setLikeDisabled] = useState(0);
    const [postId, setPostId] = useState(0);
    const [checkLike, setCheckLike] = useState(0);
    const [checkDisLike, setChecDiskLike] = useState(0);
    const [startCallApi, setStartCallApi] = useState(1);
    const [likePostsId, setLikePostsId] = useState([]);
    const [disLikePostsId, setDisLikePostsId] = useState([]);
    const [filterCommPost, setFilterCommPost] = useState('');
    const history = useHistory();
    const getCommName = useSelector(state => state.postCommunityReducer);

    const [sliderData, setSliderData] = useState({
        useGPURender: true,
        showNavs: true,
        showBullets: false,
        navStyle: 1,
        slideDuration: 1,
        bgColor: "#000000",
        slideIndexText: "",
        autoPlay: true
    });

    {/*Get logged user details*/}
    useEffect(() => {
        if (otherUserId != localStorage.getItem('userId')) {
            localStorage.setItem('flag', 1);
        } else {
            localStorage.setItem('flag', 0);
        }
        axios.get(process.env.REACT_APP_API_URL + "/getUser/" + localStorage.getItem("emailId")
        ).then((response) => {
            localStorage.setItem("userId", response.data.User.id)
            setUsername(response.data.User.username)
        })
            .catch((error) => {
                console.log(error)
            });
    }, [localStorage.getItem("emailId"), like, dislike]);

    {/*Display logged user post*/}
    useEffect(() => {
        axios.post(
            process.env.REACT_APP_API_URL + `/getpostByuid/${typeof otherUserId !== 'undefined' ? otherUserId : localStorage.getItem('userId')}`, {
            search: getCommName.searchText
        },
        ).then((response) => {
            setStorePostData(response.data.posts);
            dispatch(getCity());

            if (response.data.posts.length === 0) {
                setLoaderStatus(false);
            } else {
                setLoaderStatus(false);

            }
        }).catch((error) => {
            console.log(error.message);
        });
    }, [localStorage.getItem('userId'), like, dislike, getCommName]);

    {/*Create like on post*/}
    const hangleLike = (e, nid, nlvalue, nuserid, userType) => {
        e.preventDefault();
        setCheckLike(1);
        setChecDiskLike(0);

        axios.post(
            process.env.REACT_APP_API_URL + "/createLike",
            {
                npostid: nid,
                nuserid: localStorage.getItem('userId'),
                nlvalue: nlvalue == 1 ? 0 : 1,
                bactive: 1,
                postnuserid: nuserid,
                postusertype: userType
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            dispatch(reRenderUserAmt())
            setLikeStatus(response.data.statusCode);
            setStartCallApi(1);
            setLike(like + 1);
        })
            .catch((error) => {
                console.log(error.message);
            });
    }

    {/*Create dislike on post*/}
    const hangleUnLike = (e, nid, nlvalue) => {
        e.preventDefault();
        setCheckLike(0);
        setChecDiskLike(1);

        axios.post(
            process.env.REACT_APP_API_URL + "/createDislike",
            {
                npostid: nid,
                nuserid: localStorage.getItem('userId'),
                nlvalue: nlvalue == -1 ? 0 : -1,
                bactive: 1,

            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            setDisLikeStatus(response.data.statusCode);
            setStartCallApi(1);
            setDisLike(dislike + 1);

        }).catch((error) => {
            console.log(error.message);
        });
    }

    {/*Get all like according to post*/}
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
                dispatch(getRelaShip());

            })
            .catch((error) => {
                console.log(error.message);

            });
    }, [like, storePostData]);


    {/*Get all dislike according to post*/}
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

    {/*Check already like or not user*/}
    useEffect(() => {

        const alreadyLikePostIds = likePostsId.map(likesVal => {
            if (likesVal.nuserid == localStorage.getItem("userId") && parseInt(likesVal.nlvalue) === 1) {
                return likePostId = likesVal.npostid;
            }
        })

        setAlreadyLikeId(alreadyLikePostIds);

    }, [likePostsId]);

    {/*Check already dislike or not user*/}
    useEffect(() => {
        const alreadyDisLikePostIds = disLikePostsId.map(likesVal => {
            if (likesVal.nuserid == localStorage.getItem("userId") && parseInt(likesVal.nlvalue) == -1) {
                return dislikePostId = likesVal.npostid;
            }
        })
        setAlreadyDisLikeId(alreadyDisLikePostIds)
    }, [disLikePostsId]);

   
   {/*Redirect of comment or bounty comment component*/}
    const commentShow = (postId, isbountyStatus) => {
        if (localStorage.getItem("userId") === null) {
            history.push("/login");
        }
        if (localStorage.getItem("userId") !== '' && postId !== '' && isbountyStatus == 0) {
            localStorage.setItem("postId", postId)
            history.push("/comment");
        }
        if (localStorage.getItem("userId") !== '' && postId !== '' && isbountyStatus == 1) {
            localStorage.setItem("postId", postId)
            history.push("/comment");
        }
    }

    const getCommunity = (commuNameId) => {
        setFilterCommPost(commuNameId);
    }

    

    console.log("storePostData",storePostData);
    return (
        <div class="container-fluid">
            <div className="row">
                <div class="col-lg-12 h-100 d-flex justify-content-center align-items-center mt-4">
                    <div class="panel_form panel panel-default">
                        {(window.location.pathname == '/dashboard' &&
                            loaderStatus == false) &&
                            <>
                                <div>
                                    <SearchPosts searchPost={searchPostUsDashBaord} />
                                </div>
                                <br />
                            </>
                        }
                        {loaderStatus == true ? <Loader /> : storePostData.length >= 1 ? storePostData.map((value, index) => (

                            <div class=" row panel-content mt-4">

                                <div class="card col-lg-12" style={{ width: '800px' }}>
                                    <p class="card-text" style={{ marginLeft: '10px' }}>

                                        <p class="text-muted" style={{ textAlign: 'left' }}>
                                            <div className="row px-3 mt-2 justify-content-between">
                                                <span>
                                                    <a href="#" style={{ color: 'black' }}>

                                                        {value.nisAnonymous == 1 ? <img src="https://avatar-ssl.xboxlive.com/avatar/davidvkimball/avatarpic-l.png" alt="Avatar" style={{ borderRadius: '50%', width: '20px' }} />
                                                            : <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="Avatar" style={{ borderRadius: '50%', width: '20px' }} />
                                                        }
                                                        &nbsp;
                                                        {value.nisAnonymous == 1 ? 'Anonymous User' : username}
                                                    </a>&nbsp;&nbsp;&nbsp;
                                                    
                                                    {
                                                        new Date().getHours() - new Date(value.created_at).getHours() < 1 ? 'Now' : new Date().getHours() - new Date(value.created_at).getHours() + ' ' + 'hours ago'
                                                    }
                                                    &nbsp;&nbsp;&nbsp;
                                                    {
                                                        checkPostExpiry(value.create_date,value.post_expire_time_type,value.post_expiry_time) 
                                                    }
                                                    &nbsp;&nbsp;&nbsp;
                                                    {
                                                        subscriptionPostExpiryTime(value.suscription_post_time,value.suscription_post_time_type)
                                                    }
                                                </span>
                                                <span>
                                                    {value.vmedia != '' ? value.isBounty == 1 || value.isSubscribed == 1 ? 
                                                      value.isSubscribed == 1 && value.post_type == 2 || value.post_type == 6 ?
                                                      <>
                                                          {/* <button style={{ cursor: 'pointer' }} type="button" class="btn btn-danger">Get Subscription</button> */}
                                                          &nbsp;&nbsp;&nbsp;
                                                          <Link to={`/edit-post/${value.nid}#Media-post`} class="item-author text-color" data-abc="true">
                                                              <button style={{ cursor: 'pointer' }} type="button" class="btn btn-primary">Edit Post</button>
                                                          </Link>
                                                       </>
                                                    :
                                                    ''
                                                        : <Link to={`/edit-post/${value.nid}#Media-post`} class="item-author text-color" data-abc="true">
                                                            <button style={{ cursor: 'pointer' }}>Edit Post</button>
                                                        </Link>
                                                        :
                                                        value.isBounty == 1 || value.isSubscribed == 1 ? 
                                                        value.isSubscribed == 1 && value.post_type == 2 || value.post_type == 6 ?
                                                        <>
                                                            {/* <button style={{ cursor: 'pointer' }} type="button" class="btn btn-danger">Get Subscription</button> */}
                                                            &nbsp;&nbsp;&nbsp;
                                                            <Link to={`/edit-post/${value.nid}#Post`} class="item-author text-color" data-abc="true">
                                                                <button style={{ cursor: 'pointer' }} type="button" class="btn btn-primary">Edit Post</button>
                                                            </Link>
                                                         </>
                                                    :
                                                    // value.isSubscribed == 1 && value.post_type == 6 ?
                                                    // <button style={{ cursor: 'pointer' }} type="button" class="btn btn-danger">Get Subscription</button>
                                                    // :
                                                    ''
                                                            : <Link to={`/edit-post/${value.nid}#Post`} class="item-author text-color" data-abc="true">
                                                                <button style={{ cursor: 'pointer' }} class="btn btn-primary">Edit Post</button>
                                                            </Link>
                                                    }
                                                </span>
                                            </div>

                                            {/* {value.post_type == 0 && (localStorage.getItem('userId') && window.location.pathname == '/dashboard') && */}
                                            {value.post_type == 0 && localStorage.getItem('userId') &&
                                                <Badge pill variant="primary">
                                                    #{'Public Post'}
                                                </Badge>
                                            }
                                            {
                                                value.post_type == 1 && localStorage.getItem('userId') &&
                                                <Badge pill variant="success">
                                                    #{'Free Post'}
                                                </Badge>
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
                                                value.post_share_type == 3 && localStorage.getItem('userId') &&
                                                <Badge pill variant="danger">
                                                    #{'Private Post'}
                                                </Badge>
                                            }
                                            {
                                                value.post_share_type == 4 && localStorage.getItem('userId') &&
                                                <Badge pill style={{ background: '#ff0080', color: '#fff' }}>
                                                    #{'Group Post'}
                                                </Badge>
                                            }
                                            {value.post_type == 6 && localStorage.getItem('userId') &&
                                                <Badge pill variant="primary">
                                                    #{'Subscription Post'}
                                                </Badge>
                                            }
                                        </p>

                                    </p>
                                    <h6 style={{ marginLeft: '10px' }}>
                                        {value.vtitle}&nbsp;&nbsp;
                                        <Badge pill variant="info">
                                            #{value.communitie_type}
                                        </Badge>
                                    </h6>
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
                                    <div class="card-body">

                                        <p class="card-text">
                                            <small class="text-muted">
                                                {
                                                    alreadyLikeId.includes(value.nid) == true && localStorage.getItem("userId").length != 0 ?
                                                        <i class="fa fa-thumbs-o-up"
                                                            aria-hidden="true" title="I like this"
                                                            onClick={(e) => hangleLike(e, value.nid, 1, value.nuserid, value.user_type)}
                                                            style={{ fontSize: '20px', cursor: 'pointer', color: alreadyLikeId.includes(value.nid) == true ? '#065fd4' : 'black' }} >
                                                            {value.likeCount}</i>
                                                        :
                                                        <i class="fa fa-thumbs-o-up"
                                                            aria-hidden="true" title="I like this"
                                                            onClick={(e) => hangleLike(e, value.nid, 0, value.nuserid, value.user_type)}
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
                                            </small>
                                            <small class="text-muted mr-4">
                                                {value.isBounty == 1
                                                    ?
                                                    <span className="mr-4" onClick={(e) => commentShow(value.nid, value.isBounty)}><i class="fa fa-comment"></i>Bounty reply</span>
                                                    :
                                                    <span className="mr-4" onClick={(e) => commentShow(value.nid, 0)}><i class="fa fa-comment"></i>comment</span>
                                                }
                                                <span><i class="fa fa-calendar"></i>
                                                    {
                                                        new Date(value.created_at).toLocaleDateString()
                                                    }
                                                </span>
                                            </small>
                                        </p>
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
        </div >
    )
}

export default memo(ViewPost);