import {
    actionType
 } from '../actionType/actionType';
 
 export const pushNotifications = (data)=> {
    return {
       type: actionType.PUSH_NOTIFICATION,
       payload:data
    }
 }

 export const oneTimePushNotification = (data)=> {
   return {
      type: actionType.ONETIME_PUSH_NOTIFICATION,
      payload:data
   }
}
 
