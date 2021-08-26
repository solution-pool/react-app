import React, {memo } from "react";
import { useHistory } from "react-router-dom";
import './../../../App.css';

const RedirectOnCreatePostForm = () => {
   
    let history = useHistory();
    {/*Re-direact the create post component*/}
    const reDirectCreatePost = () => {
        history.push('/create-post');
    }


    return (
        <React.Fragment>
            <form onFocus={reDirectCreatePost}>
                <div class="form-group row justify-content-center">
                    <div class="col-md-6">
                        <input type="email" style={{cursor:'pointer'}} class="form-control" id="create-post" placeholder="Create Post" />
                    </div>

                </div>
            </form>
        </React.Fragment>
    )
}

export default memo(RedirectOnCreatePostForm);
