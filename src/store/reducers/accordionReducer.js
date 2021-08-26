import { actionType } from '../actionType/actionType';

export const InitialState = {
    aboutMe:{
        value:false,
    },
    address:{
        value:false,
    },
    education:{
        value:false,
    },
    phone_no:{
        value:false,
    },
    relationship:{
        value:false,
    },
    work_place:{
        value:false,
    },
    profession:{
        value:false,
    },
};

export const accordionReducer = (state = InitialState, action) => {
   
    switch (action.type) {
        case actionType.ACCORDION_ACTION:
            if (action.payload.about_me == 'about_me') {
                console.log("actionRedu123",action.payload.about_me == 'about_me')
               return{
                ...InitialState,
                aboutMe:{
                    value:action.payload.status,
                }
               }
            }
            else if (action.payload.address == 'address') {
                return{
                    ...InitialState,
                    address:{
                        value:action.payload.status,
                    }
                   }
            }
            else if (action.payload.education == 'education') {
                return{
                    ...InitialState,
                    education:{
                        value:action.payload.status,
                    }
                   }
            }
            else if (action.payload.phone_no == 'phone_no') {
                return{
                    ...InitialState,
                    phone_no:{
                        value:action.payload.status,
                    }
                   }
            }
            else if (action.payload.relationship == 'relationship') {
                return{
                    ...InitialState,
                    relationship:{
                        value:action.payload.status,
                    }
                   }
            }
            else if (action.payload.work_place == 'work_place') {
                return{
                    ...InitialState,
                    work_place:{
                        value:action.payload.status,
                    }
                   }
            }
            else if (action.payload.profession == 'profession') {
                return{
                    ...InitialState,
                    profession:{
                        value:action.payload.status,
                    }
                   }
            }else{
                console.log("nomathc",InitialState)
                return InitialState
            }
            
        default: return state;
    }

}