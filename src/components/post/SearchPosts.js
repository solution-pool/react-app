import React,{memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {DebounceInput} from 'react-debounce-input';

const SearchPosts = ({ searchPost }) => {
    const dispatch = useDispatch();

    return (
        <div style={{ width: '800px' }}> 
        <DebounceInput
           type="text"
            minLength={4}
            debounceTimeout={400}
            onChange={(e) => dispatch(searchPost(e.target.value))} 
            placeholder="Search Post"
            class="form-control"
        />
    </div>
    )
}

export default memo(SearchPosts);