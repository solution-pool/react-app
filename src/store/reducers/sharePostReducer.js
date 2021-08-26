import { actionType } from '../actionType/actionType';
export const InitialState = {
     status: false,
     frdClientDisplay:""
  
};

export const sharePostReducer = (state = InitialState, action) => {
    console.log("action12345",action);
    switch (action.type) {
        case actionType.SHARE_POST_WITH_FRIEND:
            return {...state,status : action.payload};
        case actionType.ALL_FRIEND_CLIENT_DISPLAY_DIALOG_BOX:
            return {...state,frdClientDisplay : action.payload};
        default: return state;
    }
}