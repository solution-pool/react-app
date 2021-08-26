import React,{useState,useEffect} from "react";
import './../../App.css';
import UserProfileImage from "./UserProfileImage";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ViewPost from './../post/ViewPost';
import FriendClientBtn from "./FriendClientBtn";
import { useLocation } from "react-router-dom";
import Header from './../header/Header';
import axios from "axios";
import Avatar from 'react-avatar';


const OtherUserProfile = ({UserId,userDetail}) => {

    // const[userDetail,setUserDetail]=useState([]);
    // useEffect(() => {
    //     axios.get(
    //         process.env.REACT_APP_API_URL + `/getUserById/${UserId}`,
    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         }
    //     ).then((response) => {
                
    //             setUserDetail(response.data.User);
    //         })
    //         .catch((error) => {
    //             console.log(error.message);

    //         });
    // },[UserId]);
    
    return (
        <>
            <Header />
            <div class="container emp-profile" style={{ background: '#f1f1f1' }}>
                
                <UserProfileImage UserId={UserId}/>
                <FriendClientBtn />
                <Tabs>
                    <TabList >
                        <Tab style={{ color: '#007bff', fontWeight: 'bold' }}>Post</Tab>
                        <Tab style={{ color: '#007bff', fontWeight: 'bold' }}>About</Tab>
                        <Tab style={{ color: '#007bff', fontWeight: 'bold' }}>Friends</Tab>
                    </TabList>
                    <TabPanel style={{ width: '100%', height: '500px', overflow: 'auto' }}>
                        <ViewPost UserId={UserId}/>
                    </TabPanel>
                    <TabPanel >
                        <h6>{`User Name : ${userDetail.firstname} ${userDetail.lastname}`} </h6>
                        <h6>{`Email :  ${userDetail.email}`} </h6>
                    </TabPanel>
                    <TabPanel>
                    <>
            <div class="page-content page-container" id="page-content">
                <div class="padding">

                        <div class="row">
                            <div class="col-sm-8">
                                <div class="list list-row block">
                                    <div class="list-item" data-id="19">
                                        <div>
                                            {/* <Link to={value.id} data-abc="true"> */}
                                            <span class="w-48 avatar gd-warning">
                                                <Avatar
                                                    size={45}
                                                    name={'demo user'} round={true}>
                                                        {'demo user'}
                                                </Avatar>

                                            </span>
                                            {/* </Link> */}
                                        </div>
                                        <div class="flex">
                                            {/* <Link class="item-author text-color" data-abc="true">
                                                {`${friRes.friendInfo[0].firstname != null ? friRes.friendInfo[0].firstname : ''} ${friRes.friendInfo[0].lastname != null ? friRes.friendInfo[0].lastname : ''}`}
                                            </Link> */}
                                            <div class="item-except text-muted text-sm h-1x">For what reason would it be advisable for me to think about business content?</div>
                                        </div>
                                        <div class="no-wrap">
                                            <div class="item-date text-muted text-sm d-none d-md-block">
                                              
                                            </div>
                                        </div>
                                       
                                        {/* <div class="no-wrap">
                                            <button type="button" class="btn btn-primary" onClick={() => friendReqAcceptOrCancel(friRes.sender_id, friRes.receive_id, 1)}>Accept</button>
                                        </div>
                                        <div class="no-wrap">
                                            <button type="button" class="btn btn-light" style={{ background: '#e4e8ec' }} onClick={() => friendReqAcceptOrCancel(friRes.sender_id, friRes.receive_id, 0)}>Cancel</button>
                                        </div> */}
                                        {/* <button className='btn btn-success'
                                            onClick={()=>createNotification('success')}>Success
                                            </button> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

        </>
                    </TabPanel>
                    <TabPanel>
                        <p>
                            romanized as Yossy, is a fictional anthropomorphic dinosaur who appears in
                            video games published by Nintendo. Yoshi debuted in Super Mario World (1990) on the
                            Super Nintendo Entertainment System as Mario and Luigi's sidekick. Yoshi later starred
                            in platform and puzzle games, including Super Mario World 2: Yoshi's Island, Yoshi's Story
                            and Yoshi's Woolly World. Yoshi also appears in many of the Mario spin-off games, including
                            Mario Party and Mario Kart, various Mario sports games, and Nintendo's crossover fighting
                            game series Super Smash Bros. Yoshi belongs to the species of the same name, which is
                            characterized by their variety of colors.
                        </p>
                    </TabPanel>
                    <TabPanel>
                        <p>
                            appears in Nintendo's Mario franchise. Created by Japanese video game designer Shigeru Miyamoto,
                            he is portrayed as a citizen of the Mushroom Kingdom and is one of Princess Peach's most loyal
                            attendants; constantly working on her behalf. He is usually seen as a non-player character (NPC)
                            who provides assistance to Mario and his friends in most games, but there are times when Toad(s)
                            takes center stage and appears as a protagonist, as seen in Super Mario Bros. 2, Wario's Woods,
                            Super Mario 3D World, and Captain Toad: Treasure Tracker.
                        </p>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}

export default OtherUserProfile;
