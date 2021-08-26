import {
    actionType
  } from '../actionType/actionType';
 
  
  
  
  export const setUserFlag = (data) => {
      console.log("data",data);
    return {
      type: actionType.SET_USER_FLAG,
      payload: data
    }
  }