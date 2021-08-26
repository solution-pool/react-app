import {
   actionType
} from '../actionType/actionType';

export const userLoginReq = (data)=> {
   return {
      type: actionType.LOGIN_REQUEST,
      payload:data
   }
}

export const userLoginSuccess = (data)=> {
   return {
      type:actionType.LOGIN_SUCCESS,
      payload:data
   }
}

export const userLoginfail = (data)=> {
   return {
      type: actionType.LOGIN_FAILURE,
      payload:data
   }
}

export const hideHeader = (data)=> {
   return {
      type: actionType.HIDE_HEADER,
      payload:data
   }
}
