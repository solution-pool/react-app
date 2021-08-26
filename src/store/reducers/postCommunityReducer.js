import { actionType } from '../actionType/actionType';
export const InitialState = {
    community: { 
        comment: []
    },
    searchText : '',
    searchHmPgText : ''
  };
  
  export const postCommunityReducer = (state = InitialState, action) => {
      console.log("action",action);
    switch (action.type) {
        case actionType.ADD_COMMUNITY:
            return {...state,community: action.payload};
        case actionType.GET_ALL_COMMUNITIES:
            return {...state,community: action.payload};
        case actionType.GET_SINGLE_COMMUNITY:
            return action.payload;
        case actionType.SEARCH_POST_USERDB:
            return {...state,searchText:action.payload}    
        case actionType.SEARCH_POST_HOMEPG:
            return {...state,searchHmPgText:action.payload}  
        default: return state;
    }

}