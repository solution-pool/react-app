import { actionType } from '../actionType/actionType';
export const InitialState = {
    userAmt: {},
    userType:'',
    postPrice:'',
    userLevelChange:'0',
    userLevelPayBoxStatus:false,
    userSubscPostDetails : {user_id: "", postAmt: "", post_type: "", post_id: "", post_user_id:""},
    userSubscPostDuraWithPrice : {duration:'',subcDuraPrice:''},
    userPurchaseTippPoint : {tippTradePoint:'',type:'',subsType:'',subPlanId:''},
    payTypeSelectModal : '',
    checkAddTippPoint : {checkedAddTippPoints:'',type:''}
};

export const userAmtReducer = (state = InitialState, action) => {
    console.log("state123",action.payload);
    switch (action.type) {
        case actionType.USER_AMT:
            return { ...state, userAmt: action.payload };
        case actionType.USER_TYPE:
            return { ...state, userType: action.payload };
        case actionType.POST_PRICE:
            return { ...state, postPrice: action.payload };
        case actionType.USER_LEVEL_CHANGE:
            return { ...state, userLevelChange: action.payload };
        case actionType.USER_LEVEL_PAY_BOX:
            return { ...state, userLevelPayBoxStatus: action.payload };
        case actionType.USER_SUBSC_POST_DETAILS:
            return { ...state,userSubscPostDetails : action.payload };
        case actionType.USER_SUBSC_POST_DURATION:
            return { ...state,userSubscPostDuraWithPrice : action.payload };
        case actionType.USER_TIPPTRADE_POINT:
            return { ...state,userPurchaseTippPoint : action.payload };
        case actionType.PAYMENT_TYPE_SELECT_MODAL:
            return { ...state,payTypeSelectModal : action.payload };
        case actionType.CHECKED_ADD_TIPP_POINT:
            return { ...state,checkAddTippPoint : action.payload };
        
            
        default: return state;
    }
}