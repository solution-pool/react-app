import { actionType } from '../actionType/actionType';
export const InitialState = {
    community: { 
        comment: []
    }
  };
  
  export const postCommunNameReducer = (state = InitialState, action) => {
    switch (action.type) {
        case actionType.SEND_COMMUNITY:
            return {postCommu:action.payload};
        default: return state;
    }

}