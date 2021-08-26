import {
    actionType
  } from '../actionType/actionType';
  import {
    getUserAmt,
  }
    from "../../apiClient";
  
  
  export const getUserAmtDetail = () => {
    return async (dispatch,state) => {
      const _payload = await getUserAmt();
      dispatch({
        type: actionType.USER_AMT,
        payload: _payload,
      });
    };
  };



  export const getUserType = (userType)=> {
    return {
     type: actionType.USER_TYPE,
     payload : userType
    }
}

export const getPostPrice = (postPirce)=>{
  return {
    type: actionType.POST_PRICE,
    payload : postPirce
   }
}

export const getUserLevelStatus = (userLevelStatus)=>{
  return {
    type: actionType.USER_LEVEL_CHANGE,
    payload : userLevelStatus
  }
}

export const getUuserLevelPayBoxStatus = (userLevelPayBoxStatus)=>{
  return {
    type: actionType.USER_LEVEL_PAY_BOX,
    payload : userLevelPayBoxStatus
  }
}


export const postUserPostSubscr = (userSubscPostDetails)=>{
  console.log("userSubscPostDetails",userSubscPostDetails);
  return {
    type: actionType.USER_SUBSC_POST_DETAILS,
    payload : userSubscPostDetails
  }
}

export const postSubsDuration = (userSubscPostDuration)=>{
  console.log("userSubscPostDuration",userSubscPostDuration);
  return {
    type: actionType.USER_SUBSC_POST_DURATION,
    payload : userSubscPostDuration
  }
}

export const PurchaseTippTradePoint = (purchaseTippPoint)=>{
  console.log("purchaseTippPoint",purchaseTippPoint);
  return {
    type: actionType.USER_TIPPTRADE_POINT,
    payload : purchaseTippPoint
  }
}

export const openPayTypeSelectModal = (status)=>{
  return {
    type: actionType.PAYMENT_TYPE_SELECT_MODAL,
    payload : status
  }
}

export const checkedAddTippPoint = (checkAddTippPoint)=>{
  return {
    type: actionType.CHECKED_ADD_TIPP_POINT,
    payload : checkAddTippPoint
  }
}


