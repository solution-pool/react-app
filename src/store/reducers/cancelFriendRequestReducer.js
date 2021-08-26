import { actionType } from '../actionType/actionType';
export const counterInitialState = {
    canFriReq: 0
  };
  
  export const cancelFriendRequestReducer = (state = counterInitialState, action) => {
    switch (action.type) {
        case actionType.CANCEL_FRIEND_REQUEST:
            return { canFriReq: state.canFriReq + 1 };
        default: return state;
    }

}