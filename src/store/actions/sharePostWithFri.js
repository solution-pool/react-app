import {
    actionType
 } from '../actionType/actionType';
 
export const sharePostWithFri = (checkAddTippPoint)=>{
  return {
    type: actionType.SHARE_POST_WITH_FRIEND,
    payload : checkAddTippPoint
  }
}

export const friendClientDisplay = (friClientDetails)=>{
  return {
    type: actionType.ALL_FRIEND_CLIENT_DISPLAY_DIALOG_BOX,
    payload : friClientDetails
  }
}


