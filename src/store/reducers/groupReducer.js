import { actionType } from '../actionType/actionType';
export const InitialState = {
    gpNames : {},
    status:false,
    InitialStateMultiSelect : false
};

export const groupReducer = (state = InitialState, action) => {
    switch (action.type) {
        case actionType.USER_GROUP_NAMES:
            return { ...state, gpNames: action.payload };
            // return { ...state, gpNames: action.payload, init_Val:action.payload.status };
        case actionType.SHOW_HIDE_CREATE_GP_FORM:
            return { ...state, status: action.payload };
        case actionType.INITIAL_MULTISELECT:
            return { ...state, InitialStateMultiSelect : action.payload };
        default: return state;
    }
}