import {
    actionType
 } from '../actionType/actionType';
 import { getAllCommunities } from "../../apiClient";

export const addCommunity = (data)=> {
    return {
       type: actionType.ADD_COMMUNITY,
       payload:data
    }
 }

 export const postCommunity = (data)=> {
    return {
       type: actionType.SEND_COMMUNITY,
       payload:data
    }
 }

 export const getSingleCommunity = (commuName)=> {
   return {
      type: actionType.GET_SINGLE_COMMUNITY,
      payload:commuName
   }
}
 
 

export const getCommunitiesNames = () => {
  return async (dispatch, state) => {
    const _payload = await getAllCommunities();
    dispatch({
      type: actionType.GET_ALL_COMMUNITIES,
      payload: _payload,
    });
  };
};

export const searchPostUsDashBaord= (searchText)=>{
   console.log("searchText",searchText)
   return{
      type: actionType.SEARCH_POST_USERDB,
      payload: searchText,
    };
}

export const searchPostHome= (searchText)=>{
   console.log("searchText",searchText)
   return{
      type: actionType.SEARCH_POST_HOMEPG,
      payload: searchText,
    };
}