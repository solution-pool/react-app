import {
   actionType
} 
from '../actionType/actionType';

export const userRegisterReq = (userInfo)=> {
    return {
       type: actionType.REGISTER_REQUEST,
       payload:userInfo
    }
 }

 export const userRegisterSuccess = (userInfo)=> {
    return {
       type: actionType.REGISTER_SUCCESS,
       payload:userInfo
    }
 }

 export const userRegisterfail = (userInfo)=> {
    return {
       type: actionType.REGISTER_FAILURE,
       payload:userInfo
    }
 }

