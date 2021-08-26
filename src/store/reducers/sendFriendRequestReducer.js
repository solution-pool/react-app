import { actionType } from '../actionType/actionType';
export const counterInitialState = {
    friReqNum: 0
  };
  
  export const sendFriendRequestReducer = (state = counterInitialState, action) => {
    switch (action.type) {
        case actionType.SEND_FRIEND_REQUEST:
            return { friReqNum: state.friReqNum + 1 };
        default: return state;
    }

}