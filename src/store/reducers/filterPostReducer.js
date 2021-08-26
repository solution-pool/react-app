import { actionType } from '../actionType/actionType';
export const InitialState = {
    postType: '',
   
};

export const filterPostReducer = (state = InitialState, action) => {
    switch (action.type) {
        case actionType.FILTER_POST_TYPE:
            return {postType:action.payload};
        default: return state;
    }
}