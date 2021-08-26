import { actionType } from '../actionType/actionType';
export const InitialState = {
   closeForm:''
  };
  
  export const closeFormReducer = (state = InitialState, action) => {
    switch (action.type) {
        case actionType.CLOSE_DESC_FORM:
            return {...state,descStatus: action.payload};
        case actionType.CLOSE_ADDRESS_FORM:
            return {...state,addressStatus: action.payload};
        case actionType.CLOSE_EDUCA_FORM:
            return {...state,educaStatus: action.payload};
        case actionType.CLOSE_PROFESS_FORM:
            return {...state,profeStatus: action.payload};
        case actionType.CLOSE_WORKPLACE_FORM:
            return {...state,workPaceStatus: action.payload};
        case actionType.CLOSE_RELATIONSHIP_FORM:
            return {...state,relaShipStatus: action.payload};
        case actionType.CLOSE_PHONO_FORM:
            return {...state,phoNoStatus: action.payload};
        default: return state;
    }

}