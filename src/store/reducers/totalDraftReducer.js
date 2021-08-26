import { actionType } from '../actionType/actionType';
export const counterInitialState = {
    counter: 0
  };
  
  export const totalDraftReducer = (state = counterInitialState, action) => {
    switch (action.type) {
        case actionType.DRAFT_COUNT:
            return { counter: state.counter + 1};
        default: return state;
    }

}