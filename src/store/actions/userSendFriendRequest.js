import {
    actionType
 } from '../actionType/actionType';
 
 export const userSendFriendRequest = (data)=> {
    return {
       type: actionType.SEND_FRIEND_REQUEST,
       payload:data
    }
 }