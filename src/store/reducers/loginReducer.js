import {
    actionType
 } 
 from '../actionType/actionType';

export const loginReducer = (state = [], action) => {
    switch (action.type) {
         case actionType.LOGIN_REQUEST:
           return {...state,loginDetail:action.payload};
         case actionType.LOGIN_SUCCESS: 
           return {...state,successMsg: action.payload};
         case actionType.LOGIN_FAILURE: 
           return {...state,errorMsg:action.payload};
           case actionType.HIDE_HEADER: 
           return state.payload;
         default: return state;
    }

}

