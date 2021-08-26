import { actionType } from '../actionType/actionType';
export const InitialState = {
    like:"",
    paid:"",
    collab:""
};

export const advancePostShareSettingReducer = (state = InitialState, action) => {
    console.log("actionvv",action);
    switch (action.type) {
        case actionType.ADVANCE_POST_SHARE_SETTING:
            return { ...state, advancePostSetting: action.payload };
        default: return state;
    }
}