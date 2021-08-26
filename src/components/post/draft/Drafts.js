import React, { useState, useEffect,memo } from 'react';
import './../../../App.css';
import Header from "./../../header/Header";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";


const Drafts = () => {
    const [allDraft, setAllDraft] = useState([]) //set login user draft details 

    {/* Get login user all draft */}
    useEffect(() => {
        axios.get(
            process.env.REACT_APP_API_URL + `/getUserDraftPosts/${localStorage.getItem('userId')}`
        ).then((response) => {
            setAllDraft(response.data.posts);
        })
            .catch((error) => {
                console.log(error.message);
            });
    }, [localStorage.getItem('userId')]);

    return (
        <React.Fragment>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <ul class="list-group">

                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span className="font-weight-bold">Drafts</span>
                            </li>
                            {allDraft.map((value) => (

                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <Link to={`/edit-post/${value.nid}`} class="item-author text-color" data-abc="true">
                                        <i style={{ cursor: 'pointer' }} class="fa fa-id-card-o" aria-hidden="true">
                                            &nbsp;&nbsp;
                                        {value.vtitle}
                                        </i>
                                    </Link>
                                    <Link to={`/create-post/${value.nid}`} class="item-author text-color" data-abc="true">
                                        <i style={{ cursor: 'pointer' }} class="fa fa-trash-o" aria-hidden="true"></i>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default memo(Drafts);

