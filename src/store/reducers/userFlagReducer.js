import { actionType } from '../actionType/actionType';
export const InitialState = {
    // userFlag: false,
    userFlag:{
        flag:false,
        otherId:''
    },
};

export const userFlagReducer = (state = InitialState, action) => {
    console.log("action",action);
    switch (action.type) {
        case actionType.SET_USER_FLAG:
            return {
                userFlag:
                {
                    flag : action.payload.flag,
                    otherId : action.payload.otherId
                }
            };
        default: return state;
    }
}