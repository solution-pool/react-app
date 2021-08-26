import React, { useEffect, useState,memo } from 'react';
import './../../App.css';
import axios from "axios";
import { useHistory } from "react-router-dom";

const PostHeader = ({ draftdraftUpd }) => {
    const [draftCount, setDraftCount] = useState(0)//set the draft count
    const history = useHistory();

    {/*Get all draft count*/ }
    useEffect(() => {
        axios.get(
            process.env.REACT_APP_API_URL + `/getUserDraftPostsCount/${localStorage.getItem('userId')}`
        ).then((response) => {
            setDraftCount(response.data.posts);
        }).catch((error) => {
            console.log(error.message);
        });
    }, [localStorage.getItem('userId'), draftdraftUpd]);

    {/*redirect the draft post component*/ }
    const reRedireactDraftCop = () => {
        if (draftCount != 0) {
            history.push("/draft-post");
        }
    }

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between _1HWpiNu6dkOnZixxwDYTVJ">
                    <div>
                        <h6 className="mb-2">Create a post</h6>
                    </div>
                    <div>
                        <button onClick={reRedireactDraftCop} style={{ color: '#32658a', font: 'inherit', textTransform: 'uppercase', fontSize: '13px', fontWeight: 'bold' }} className="mb-2" role="button" tabindex="0" >
                            Drafts
                               <span className="_3-lCASba1yl0jeRpeQ5jwm">{draftCount}</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(PostHeader);