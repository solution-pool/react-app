import { actionType } from '../actionType/actionType';

  export const pushNotificationReducer = (state =[] , action) => {
    switch (action.type) {
        case actionType.PUSH_NOTIFICATION:
            return {...state,userDetail : action.payload};
        case actionType.ONETIME_PUSH_NOTIFICATION:
            return {...state,oneTimeNofiMsg : action.payload};
        default: return state;
    }

}