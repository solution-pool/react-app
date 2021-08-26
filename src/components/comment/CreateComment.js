import React, { useState,memo } from "react";
import axios from 'axios';
import { reRenderCommment } from "../../store/actions/reRenderComponent";
import { useSelector, useDispatch } from "react-redux";


const CreateComment = ({ username, value }) => {

    const [comments, setComments] = useState('')
    const [renderComText, setRenderComText] = useState(0);
    const reRenderComReducer = useSelector(state => state.reRenderComReducer);
    const dispatch = useDispatch();

    {/*Create comment*/}
    const createComment = (e, postId) => {
        e.preventDefault();
        axios.post(
            process.env.REACT_APP_API_URL + "/createComment",
            {
                npostid: postId,
                nuserid: localStorage.getItem("userId"),
                comments: comments,
                bactive: 1
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            dispatch(reRenderCommment());
            setComments('');
        }).catch((error) => {
            console.log(error.message);
        });
    }

    return (
        <>
            <form onSubmit={(e) => createComment(e, value)}>
                <div class="form-group">
                    <label for="comment">Comment as <span style={{ color: '#ff4500' }}>{username}</span></label>
                    <textarea class="form-control" rows="5" value={comments} onChange={(e) => setComments(e.target.value)} id="comment" placeholder="What are your thoughts?"></textarea>
                </div>
                <div className="form-group" style={{ float: 'right' }}>
                    <button className="btn btn-success" style={{ background: '#32658a' }} type="submit" disabled={comments.length > 1 ? '' : 'disabled'}>COMMENT</button>
                </div>
            </form>
        </>
    )
}

export default memo(CreateComment);

