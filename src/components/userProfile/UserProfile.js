import React, { useEffect, useMemo, useState } from "react";
import './../../App.css';
import UserProfileImage from "./UserProfileImage";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ViewPost from './../post/ViewPost';
import SubscriptionPlan from './SubscriptionPlan';
import FriendClientBtn from "./FriendClientBtn";
import { useLocation, useParams } from "react-router-dom";
import Header from './../header/Header';
import ShowAllUsersList from "./ShowAllUsersList";
import Friends from "./Friends";
import FriendRequests from "./FriendRequests";
import Clients from "./Clients";
import ClientRequests from "./ClientRequests";
// import About from "./userAbout/UserAddMoreDetails";
import About from "./userAbout/UserDetailSidebar";
import CreateGroup from './group/CreateGroup'

import { useSelector, useDispatch } from "react-redux";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import PushNotification from "./../pushNotification/Notification";
import Avatar from 'react-avatar';
import { Link } from "react-router-dom";
import { capitalizeName } from "./../../utility/";




const UserProfile = ({ otherUserId, userDetail }) => {
    // const pushNotificationReducer = useSelector(state => state.pushNotificationReducer);
    // console.log(pushNotificationReducer);
    const [activePostTab, setActivePostTab] = useState('');
    const [activeAboutTab, setActiveAboutTab] = useState('');
    const [activeAllUserTab, setActiveAllUserTab] = useState('');
    const [activeFriReqTab, setActiveAllFriReqTab] = useState('');
    const [activeFriTab, setActiveAllFriTab] = useState('');
    const [activeCreateGroupTab, setActiveCreateGroupTab] = useState('');
    const [activeCreateSubscPlanTab, setAactiveCreateSubscPlanTab] = useState('');
    const [activeCliReqTab, setActiveAllCliReqTab] = useState('');
    const [activeClientTab, setActiveClientTab] = useState('');


    const cancelFriendRequestReducer = useSelector(state => state.cancelFriendRequestReducer);

    const aboutCompo = useMemo(() => {
        return <About />
    }, [])

    useEffect(() => {
        console.log(window.location.hash == '#Post')
        if (window.location.hash == '#Post') {
            setActivePostTab('tab-pane active')
            setActiveAboutTab('')
            setActiveAllUserTab('');
            setActiveAllFriReqTab('');
            setActiveAllFriTab('');
            setActiveAllCliReqTab('');
            setActiveClientTab('')
            setActiveCreateGroupTab('');
            setAactiveCreateSubscPlanTab('')
        }
        else if (window.location.hash == '#About') {
            setActiveAboutTab('tab-pane active')
            setActivePostTab('')
            setActiveAllUserTab('');
            setActiveAllFriReqTab('');
            setActiveAllFriTab('');
            setActiveAllCliReqTab('');
            setActiveClientTab('')
            setActiveCreateGroupTab('');
            setAactiveCreateSubscPlanTab('')

        }
        else if (window.location.hash == '#All_users') {
            setActiveAllUserTab('tab-pane active')
            setActiveAboutTab('')
            setActivePostTab('')
            setActiveAllFriReqTab('');
            setActiveAllFriTab('');
            setActiveAllCliReqTab('');
            setActiveClientTab('')
            setActiveCreateGroupTab('');
            setAactiveCreateSubscPlanTab('')

        }
        else if (window.location.hash == '#Friends_requests') {
            setActiveAllFriReqTab('tab-pane active')
            setActiveAllUserTab('')
            setActiveAboutTab('')
            setActivePostTab('')
            setActiveAllFriTab('');
            setActiveAllCliReqTab('');
            setActiveClientTab('')
            setActiveCreateGroupTab('');
            setAactiveCreateSubscPlanTab('')
        }
        else if (window.location.hash == '#Friends') {
            setActiveAllFriTab('tab-pane active')
            setActiveAllFriReqTab('')
            setActiveAllUserTab('')
            setActiveAboutTab('')
            setActivePostTab('')
            setActiveAllCliReqTab('');
            setActiveClientTab('')
            setActiveCreateGroupTab('');
            setAactiveCreateSubscPlanTab('')
        }
        else if (window.location.hash == '#Clients_requests') {
            setActiveAllCliReqTab('tab-pane active')
            setActiveAllFriTab('')
            setActiveAllFriReqTab('')
            setActiveAllUserTab('')
            setActiveAboutTab('')
            setActivePostTab('')
            setActiveClientTab('')
            setActiveCreateGroupTab('');
            setAactiveCreateSubscPlanTab('')
        }
        else if (window.location.hash == '#Clients') {
            setActiveClientTab('tab-pane active')
            setActiveAllCliReqTab('')
            setActiveAllFriTab('')
            setActiveAllFriReqTab('')
            setActiveAllUserTab('')
            setActiveAboutTab('')
            setActivePostTab('')
            setActiveCreateGroupTab('');
            setAactiveCreateSubscPlanTab('')
        }else if (window.location.hash == '#Create_group') {
            setActiveCreateGroupTab('tab-pane active')
            setActiveClientTab('');
            setActiveAllCliReqTab('')
            setActiveAllFriTab('')
            setActiveAllFriReqTab('')
            setActiveAllUserTab('')
            setActiveAboutTab('')
            setActivePostTab('')
            setAactiveCreateSubscPlanTab('')
        }else if (window.location.hash == '#Subcription_plan') {
            setAactiveCreateSubscPlanTab('tab-pane active');
            setActiveCreateGroupTab('')
            setActiveClientTab('');
            setActiveAllCliReqTab('')
            setActiveAllFriTab('')
            setActiveAllFriReqTab('')
            setActiveAllUserTab('')
            setActiveAboutTab('')
            setActivePostTab('')
        }
         
        else if (window.location.hash.length == 0)
            // else{
            setActivePostTab('tab-pane active')
        // }
    }, [window.location.hash])
    const getHash = (e, text) => {
        //     setActiveClass(text)
        var url = window.location.href;
        // var hash = window.location.hash.replace(/^#/, '');  // ^ means starting, meaning only match the first hash
        // console.log("hash", hash);

        // if (hash) {
        //   console.log("hash",hash);
        //   window.$('.nav-tabs a[href="#' + hash + '"]').tabs('show');
        // } 

        // Change hash for page-reload
        // window.$('.nav-tabs a').on('shown.bs.tab', function (e) {
        window.location.hash = e.target.hash;
        console.log("window.location.hash", window.location.hash, url);
        // })
    }

    return (
        <>
            <Header />
            <div class="container emp-profile" style={{ background: '#f1f1f1' }}>
            <UserProfileImage otherUserId={otherUserId} />
                        <h6 style={{ textAlign: 'center', marginTop: '50px', fontSize: '30px' }}>{userDetail != undefined && capitalizeName(userDetail.firstname == undefined ? '' : userDetail.firstname) + ' ' + capitalizeName(userDetail.lastname == undefined ? '' : userDetail.lastname)}</h6>
                <div class="tab-wrap">
                    <div class="parrent pull-left">
                        <ul class="nav nav-tabs nav-stacked">
                            <li class="mr-4"><a href="#Post" data-toggle="tab" className={`analistic-01 ${activePostTab}`}  style={{ color : activePostTab != '' ? 'black' : '',padding: activePostTab != '' ? '10px' :'',paddingBottom: activePostTab != '' ? '0px' :''}} onClick={e => getHash(e)}>Post</a></li>
                            <li class="mr-4"><a href="#About" data-toggle="tab" class={`analistic-02 ${activeAboutTab}`} style={{ color : activeAboutTab != '' ? 'black' : '',padding: activeAboutTab != '' ? '10px' :'',paddingBottom: activeAboutTab != '' ? '0px' :''}} onClick={e => getHash(e)}>About</a></li>
                            <li class="mr-4"><a href="#All_users" data-toggle="tab" class={`analistic-02 ${activeAllUserTab}`} style={{ color : activeAllUserTab != '' ? 'black' : '',padding: activeAllUserTab != '' ? '10px' :'',paddingBottom: activeAllUserTab != '' ? '0px' :''}} onClick={e => getHash(e)}>All Users</a></li>
                            <li class="mr-4"><a href="#Friends_requests" data-toggle="tab" class={`analistic-02 ${activeFriReqTab}`} style={{ color : activeFriReqTab != '' ? 'black' : '',padding: activeFriReqTab != '' ? '10px' :'',paddingBottom: activeFriReqTab != '' ? '0px' :''}}  onClick={e => getHash(e)}>Friends Requests</a></li>
                            <li class="mr-4"><a href="#Friends" data-toggle="tab" class={`analistic-02 ${activeFriTab}`} style={{ color : activeFriTab != '' ? 'black' : '',padding: activeFriTab != '' ? '10px' :'',paddingBottom: activeFriTab != '' ? '0px' :''}} onClick={e => getHash(e)}>Friends</a></li>
                            <li class="mr-4"><a href="#Clients_requests" data-toggle="tab" class={`analistic-02 ${activeCliReqTab}`} style={{ color : activeCliReqTab != '' ? 'black' : '',padding: activeCliReqTab != '' ? '10px' :'',paddingBottom: activeCliReqTab != '' ? '0px' :''}} onClick={e => getHash(e)}>Clients Requests</a></li>
                            <li class="mr-4"><a href="#Clients" data-toggle="tab" class={`analistic-03 ${activeClientTab}`} style={{ color : activeClientTab != '' ? 'black' : '',padding: activeClientTab != '' ? '10px' :'',paddingBottom: activeClientTab != '' ? '0px' :''}} onClick={e => getHash(e)}>Clients</a></li>
                            <li class="mr-4"><a href="#Create_group" data-toggle="tab" class={`analistic-03 ${activeCreateGroupTab}`} style={{ color : activeCreateGroupTab != '' ? 'black' : '',padding: activeCreateGroupTab != '' ? '10px' :'',paddingBottom: activeCreateGroupTab != '' ? '0px' :''}} onClick={e => getHash(e)}>Create Group</a></li>
                            <li class="mr-4"><a href="#Subcription_plan" data-toggle="tab" class={`analistic-03 ${activeCreateSubscPlanTab}`} style={{ color : activeCreateSubscPlanTab != '' ? 'black' : '',padding: activeCreateSubscPlanTab != '' ? '10px' :'',paddingBottom: activeCreateSubscPlanTab != '' ? '0px' :''}} onClick={e => getHash(e)}>Subscription Plan</a></li>
                        </ul>
                    </div>
                    <div class="container emp-profile" style={{ background: '#f1f1f1' }}>
                        {/* <UserProfileImage otherUserId={otherUserId} />
                        <h6 style={{ textAlign: 'center', marginTop: '50px', fontSize: '30px' }}>{userDetail != undefined && capitalizeName(userDetail.firstname == undefined ? '' : userDetail.firstname) + ' ' + capitalizeName(userDetail.lastname == undefined ? '' : userDetail.lastname)}</h6> */}

                        <div class="tab-content">
                            {activePostTab == 'tab-pane active' &&
                                <div class={activePostTab} id="Post" style={{ width: '100%', height: '500px', overflow: 'auto' }}>
                                    <ViewPost />
                                </div>
                            }
                            {activeAboutTab == 'tab-pane active' &&
                                <div class={activeAboutTab} id="About">
                                    {aboutCompo}
                                </div>
                            }
                            {activeAllUserTab == 'tab-pane active' &&
                                <div class={activeAllUserTab} id="All_users">
                                    <ShowAllUsersList />
                                </div>
                            }
                            {activeFriReqTab == 'tab-pane active' &&
                                <div class={activeFriReqTab} id="Friends_requests">
                                    <FriendRequests />
                                </div>
                            }
                            {activeFriTab == 'tab-pane active' &&
                                <div class={activeFriTab} id="Friends">
                                    <Friends />
                                </div>
                            }
                            {activeCliReqTab == 'tab-pane active' &&
                                <div class={activeCliReqTab} id="Clients_requests">
                                    <ClientRequests />
                                </div>
                            }
                            {activeClientTab == 'tab-pane active' &&
                                <div class={activeClientTab} id="Clients">
                                    <Clients />
                                </div>
                            }
                             {activeCreateGroupTab == 'tab-pane active' &&
                                <div class={activeCreateGroupTab} id="Create_group">
                                    <CreateGroup />
                                </div>
                            }
                             {activeCreateSubscPlanTab == 'tab-pane active' &&
                                <div class={activeCreateSubscPlanTab} id="Subcription_plan">
                                    <SubscriptionPlan />
                                </div>
                            }
                            

                        </div>
                    </div>
                </div>
            </div>
            {/* <div class="container emp-profile" style={{ background: '#f1f1f1' }}>
                <UserProfileImage otherUserId={otherUserId} />
                <h6 style={{ textAlign: 'center', marginTop: '50px', fontSize: '30px' }}>{userDetail != undefined && capitalizeName(userDetail.firstname == undefined ? '' : userDetail.firstname) + ' ' + capitalizeName(userDetail.lastname == undefined ? '' : userDetail.lastname)}</h6>
                <Tabs>
                    <TabList >
                        <Tab style={{ color: '#007bff', fontWeight: 'bold' }}>Post</Tab>
                        <Tab style={{ color: '#007bff', fontWeight: 'bold' }}>About</Tab>
                        <Tab style={{ color: '#007bff', fontWeight: 'bold' }}>All Users</Tab>
                        <Tab style={{ color: '#007bff', fontWeight: 'bold' }}>Friends Requests</Tab>
                        <Tab style={{ color: '#007bff', fontWeight: 'bold' }}>Friends</Tab>
                        <Tab style={{ color: '#007bff', fontWeight: 'bold' }}>Clients Requests</Tab>
                        <Tab style={{ color: '#007bff', fontWeight: 'bold' }}>Clients</Tab>
                    </TabList>
                    <TabPanel style={{ width: '100%', height: '500px', overflow: 'auto' }}>
                        <ViewPost />
                    </TabPanel>
                    <TabPanel >
                        {aboutCompo}
                    </TabPanel>
                    <TabPanel>
                        <ShowAllUsersList />
                    </TabPanel>
                    <TabPanel>
                        <FriendRequests />
                    </TabPanel>
                    <TabPanel>
                        <Friends />
                    </TabPanel>
                    <TabPanel>
                        <ClientRequests />
                    </TabPanel>
                    <TabPanel>
                        <Clients />
                    </TabPanel>

                </Tabs>
            </div> */}
        </>
    )
}

export default UserProfile;
