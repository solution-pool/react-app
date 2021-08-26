import {
    actionType
  } from '../actionType/actionType';

   
 export const advancePostShareSetting = (data)=> {
    return {
     type: actionType.ADVANCE_POST_SHARE_SETTING,
     payload : data
    }
}


