import {
    actionType
  } from '../actionType/actionType';
 
  
  
  
  export const filterPost = (data) => {
    return {
      type: actionType.FILTER_POST_TYPE,
      payload: data
    }
  }
  