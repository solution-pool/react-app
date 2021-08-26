import React, { useEffect, useState,memo } from 'react';
import { useHistory } from "react-router-dom";
import 'react-tabs/style/react-tabs.css';
import MediaContent from './mediaContent/MediaContent';
import PostHeader from './PostHeader';
import CreatePosts from './editor/CreatePost';
import Header from '../header/Header';
import { useSelector } from "react-redux";
import Communities from "./community/Communities";


const PostTabs = () => {
    let history = useHistory();
    const [activePostTab, setActivePostTab] = useState('');
    const [activeMediaPostTab, setActiveMediaPostTab] = useState('');
    const draftUpdate = useSelector(state => state.totalDraftReducer);
    const getCommName = useSelector(state => state.postCommunityReducer);

    useEffect(() => {
        if (localStorage.getItem("userId") === null) {
            history.push("/login");
        }
    }, [localStorage.getItem("userId")]);

    useEffect(() => {
        if (window.location.hash == '#Post') {
            console.log("tab","post show")
            setActivePostTab('tab-pane active')
            setActiveMediaPostTab('')
        } else if (window.location.hash == '#Media-post') {
            console.log("tab","madia show")
            setActiveMediaPostTab('tab-pane active')
            setActivePostTab('')
        } else if (window.location.hash.length == 0) {
            setActivePostTab('tab-pane active')
        }
    }, [window.location.hash])

    const getHash = (e, text) => {
        var url = window.location.href;
        window.location.hash = e.target.hash;
    }

    return (
        <React.Fragment>
            <Header />
            <div style={{ width: '1300px' }} className="container">
                <PostHeader draftdraftUpd={draftUpdate} />
                <Communities getCommName={getCommName} />
                <div class="tab-wrap">
                    <div class="parrent pull-left">
                        <ul class="nav nav-tabs nav-stacked">
                            <li class="mr-4"><a href="#Post" data-toggle="tab" className={`analistic-01 ${activePostTab}`} style={{ color: activePostTab != '' ? 'black' : '', padding: activePostTab != '' ? '10px' : '', paddingBottom: activePostTab != '' ? '0px' : '' }} onClick={e => getHash(e)}>Post</a></li>
                            <li class="mr-4"><a href="#Media-post" data-toggle="tab" class={`analistic-02 ${activeMediaPostTab}`} style={{ color: activeMediaPostTab != '' ? 'black' : '', padding: activeMediaPostTab != '' ? '10px' : '', paddingBottom: activeMediaPostTab != '' ? '0px' : '' }} onClick={e => getHash(e)}>Images & Video</a></li>
                        </ul>
                    </div>
                </div>
                <div class="emp-profile" style={{ background: '#f1f1f1'}}>
                    <div class="tab-content">
                        {activePostTab == 'tab-pane active' &&
                            <div  class={activePostTab} id="Post" >
                                <CreatePosts />
                            </div>
                        }
                        {activeMediaPostTab == 'tab-pane active' &&
                            <div  class={activeMediaPostTab} id="Media-post">
                                <MediaContent />
                            </div>
                        }
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default memo(PostTabs);
