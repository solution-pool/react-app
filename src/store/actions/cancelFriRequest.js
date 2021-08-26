import {
    actionType
 } from '../actionType/actionType';
 
 export const cancelFriRequest = (data)=> {
    return {
       type: actionType.CANCEL_FRIEND_REQUEST,
       payload:data
    }
 }