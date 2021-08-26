import {useState, useEffect } from "react";
import axios from 'axios';
import Loader from '../../loader/Loader';
import Header from '../../header/Header';

import htmlParser from 'react-html-parser';
import { Player } from 'video-react';
import Badge from 'react-bootstrap/Badge';
import {useParams } from "react-router-dom";

const LikePostsDisplay = () => {
    const [loaderStatus, setLoaderStatus] = useState(true);
    const [storePostData, setStorePostData] = useState('');
    const [username, setUsername] = useState('');
    let { id: otherUserId } = useParams();

    {/*Get login user liked post*/}
    useEffect(() => {
        console.log(otherUserId);
        if (otherUserId != 'undefined' && otherUserId == localStorage.getItem('userId')) {
            axios.get(
                process.env.REACT_APP_API_URL + `/getLoginUserLikePost/${otherUserId}`
            ).then((response) => {
                setStorePostData(response.data.likePostList);

                if (response.data.likePostList.length === 0) {
                    setLoaderStatus(false);
                } else {
                    setLoaderStatus(false);
                }
            }).catch((error) => {
                console.log(error.message);
            });
        }
        
        {/*Get login user name*/}
        axios.get(process.env.REACT_APP_API_URL + "/getUser/" + localStorage.getItem("emailId")
        ).then((response) => {
            setUsername(response.data.User.username)
        }).catch((error) => {
            console.log(error)
        })
    }, [otherUserId]);

    return (
        <>
            <Header />
            <div class="container-fluid">
                <div className="row">
                    <div class="col-lg-12 h-100 d-flex justify-content-center align-items-center mt-4">
                        <div class="panel_form panel panel-default">
                            {loaderStatus == true ? <Loader /> : storePostData.map((value, index) => (
                                <div class=" row panel-content mt-4">
                                    <div class="card col-lg-12" style={{ width: '800px' }}>
                                        <p class="card-text" style={{ marginLeft: '10px' }}>
                                            <p class="text-muted">
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
                                                    <img src={value} alt='images' style={{ width: '500px' }} />
                                                    :
                                                    <Player>
                                                        <source src={value} />
                                                    </Player>
                                            ))

                                        }
                                        <div class="card-body">

                                            <p class="card-text">
                                                <small class="text-muted">
                                                    <i class="fa fa-thumbs-o-up"
                                                        aria-hidden="true" title="I like this"
                                                        style={{ fontSize: '20px', /*cursor: 'pointer'*/ color: '#065fd4' }} >
                                                        {/* {value.likeCount} */}
                                                    </i>
                                                </small>
                                                <small class="text-muted mr-4">
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
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default LikePostsDisplay;