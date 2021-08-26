import React,{memo} from "react";

const CommentReplyOfReplys = ({replyOfReplyBoxView,replyDetailNid,commentDetailNid,replys,setReplys,onSubmitCreateReply,replysLen}) => {
   
    return (
        <div className="form-group" style={{ float: 'left', width: '770px', marginTop: '15px', marginBottom: '0px', paddingLeft: '40px',display: replyOfReplyBoxView == replyDetailNid ? 'block' : 'none'
    }} >
            <span className="commenet" tyle={{ color: 'rgb(167, 154, 154);' }}  >Reply</span>
            <form onSubmit={onSubmitCreateReply}>
                <div class="form-group">
                    <textarea class="form-control" rows="5" value={replyOfReplyBoxView == replyDetailNid ? replys : ''} onChange={setReplys} id="comment" placeholder="What are your thoughts?"></textarea>
                </div>
                <div className="form-group" style={{ float: 'right' }}>
                    <button className="btn btn-success" style={{ background: '#32658a' }} type="submit" disabled={replysLen > 1 ? '' : 'disabled'}>Reply</button>
                </div>
            </form>
        </div>
    )
}

export default memo(CommentReplyOfReplys);

