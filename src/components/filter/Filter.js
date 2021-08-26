import React,{memo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPost } from "../../store/actions/filterPost";
import './../../App.css';


const Filter = () => {
    const dispatch = useDispatch();
    
    {/*Filter post according to filter type*/}
    const filterType = (e, type) => {
        e.preventDefault();
        dispatch(filterPost(type))
    }

    return (
        <nav class="navbar navbar-expand-sm  navbar-dark d-flex justify-content-between mb-4" style={{ backgroundColor: '#7d7b7b', width: '800px' }}>
            <ul class="navbar-nav d-flex justify-content-between " style={{ fontWeight: 'bold' }}>
                <li class="nav-item" style={{ paddingRight: '40px',color:'#fff' }}>
                    <a class="nav-link" onClick={(e) => filterType(e, 'new')}>New</a>
                </li>
                <li class="nav-item" style={{ paddingRight: '40px' }}>
                    <a class="nav-link" onClick={(e) => filterType(e, 'hot')}><i class="fa fa-hot"></i>Hot</a>
                </li>
            </ul>
        </nav>
    )
}

export default memo(Filter);
