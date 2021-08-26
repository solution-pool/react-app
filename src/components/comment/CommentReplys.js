import React, { memo } from "react";

const CommentReplys = ({ commentReplyBoxView, commentDetailNid, onSubmitCommentReply, replysLen, setReplys, replys }) => {

    return (
        <div className="form-group" style={{ float: 'left', width: '770px', marginTop: '15px', marginBottom: '0px', paddingLeft: '40px', display: commentReplyBoxView == commentDetailNid ? 'block' : 'none' }} >
            <span className="commenet" tyle={{ color: 'rgb(167, 154, 154);' }}  >Reply</span>
            <form onSubmit={onSubmitCommentReply}>
                <div class="form-group">
                    <textarea class="form-control" rows="5" value={commentReplyBoxView == commentDetailNid ? replys : ''} onChange={setReplys} id="comment" placeholder="What are your thoughts?"></textarea>
                </div>
                <div className="form-group" style={{ float: 'right' }}>
                    <button className="btn btn-success" style={{ background: '#32658a' }} type="submit" disabled={replysLen > 1 ? '' : 'disabled'}>Reply</button>
                </div>

            </form>
        </div>
    )
}

export default memo(CommentReplys);
