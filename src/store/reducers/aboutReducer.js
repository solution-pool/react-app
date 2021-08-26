import { actionType } from '../actionType/actionType';
export const InitialState = {
    getCtiy: '',
    homeTown: '',
    relaShip: {
        RelationshipList: [],
    },
    phoneno: {
        User: {
            aboutus: [],
        }
    },
    addPnoneNo: '',
    editUserDetail: '',
    stateList: [],
    cityList: [],
    getProfessions: [],
    deleteAboutUs : []
};

export const aboutReducer = (state = InitialState, action) => {
    switch (action.type) {
        case actionType.GET_CITY:
            return { ...state.getCtiy, city: action.payload };
        case actionType.GET_RELASHIP:
            return { ...state, relaShip: action.payload };
        case actionType.GET_PHONENO:
            return { ...state, phoneno: action.payload };
        case actionType.ADD_PHONENO:
            return { ...state, addPnoneNo: action.payload };
        case actionType.EDIT_USER_DETAIL:
            return { ...state, editUserDetail: action.payload };
        case actionType.GET_ALL_STATES:
            return { ...state, stateListing: action.payload };
        case actionType.GET_CITY_BY_STATEID:
            return { ...state, cityListing: action.payload };
        case actionType.GET_ALL_PROFESSIONS:
            return { ...state, professListing: action.payload };
        case actionType.DELETE_ABOUT_DETAIL:
            return {deleteAboutInfo : action.payload };
        case actionType.PHONE_COUNTRY_CODE_LIST:
            return {...state,PhoCodeList : action.payload };
        default: return state;
    }
}