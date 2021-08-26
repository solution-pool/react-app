import React, { useEffect, useState,memo } from "react";
import './../../../App.css';
import axios from "axios";
import { addCommunity, postCommunity, getCommunitiesNames, getSingleCommunity } from "../../../store/actions/postCommunity";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CreateGroup from '../../userProfile/group/CreateGroup';
import CreateGroupBtn from '../../userProfile/group/CreateGroupBtn';

const Communities = ({ getCommName }) => {
    const [communit, setCommnunities] = useState([]);
    const [addNewCommu, setNewCommu] = useState('');
    const [searchCommu, setSearchCommu] = useState({ name: '', id: '' });
    const [optionValues, setOptionValues] = useState([]);
    const dispatch = useDispatch();
    let postCommunities = useSelector(state => state.postCommunityReducer);
    const { id: postId } = useParams();



    {/*Get listing of communities*/ }
    useEffect(() => {
        dispatch(getCommunitiesNames());
    }, []);

    useEffect(() => {
        if (postId != undefined) {
            axios.get(
                process.env.REACT_APP_API_URL + `/getSinglePosts/${postId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                setSearchCommu({ name: response.data.posts[0].communitie_type, id: response.data.posts[0].communitie_id });
                dispatch(postCommunity({ name: response.data.posts[0].communitie_type, id: response.data.posts[0].communitie_id }))
            }).catch((error) => {
                console.log(error.message);
            });
        } else {
            setSearchCommu({ name: '', id: '' });
        }

    }, [postId])


    // console.log("postCommunities",postCommunities.community != undefined ? postCommunities  : '' );
    const handleChange = (e) => {
        let filterData = [];
        if (e.target.value === "") { setOptionValues([]); } else {
            if (searchCommu.name.length > 0) {
                filterData = postCommunities.community != undefined && postCommunities.community.comment.filter((i) => {
                    return i.communitie_type.toLowerCase().match(searchCommu.name.toLowerCase())
                })
            }
            setOptionValues(filterData);
        }
        setSearchCommu({ name: e.target.value, id: 1 })
        dispatch(postCommunity({ name: e.target.value, id: 1 }));
    }
    const getCommunName = (comNam, id, e) => {
        e.preventDefault();
        setSearchCommu({ name: comNam, id: id })
        dispatch(postCommunity({ name: comNam, id: id }));
        setOptionValues([]);

    }
    return (
        <React.Fragment>
            <div className="row  justify-content-between">

                <div class="col-md-8">
                    {/* Right-aligned menu */}
                    <input name="community" value={searchCommu.name} onChange={handleChange} placeholder="Search topic" class="communities" autocomplete="off"></input>
                    <div class="list-group">
                        {/* <input name="community" value={searchCommu.name} onChange={handleChange} placeholder="Search topic" class="communities" autocomplete="off"></input> */}
                        <ul style={{ listStyle: 'none' }} >
                            {
                                (optionValues !== undefined) ? optionValues.map((item) => {
                                    return <><li style={{ cursor: 'pointer' }} onClick={(e) => getCommunName(item.communitie_type, item.id, e)}>
                                        <a href="#" class="list-group-item list-group-item-action">{item.communitie_type}</a></li> </>
                                })
                                    :
                                    null
                            }
                        </ul>
                    </div>
                </div>
                <div class="col-md-4">
                    <CreateGroupBtn />
                </div>
            </div>

        </React.Fragment>
    )
}
export default memo(Communities);
