import {
    actionType
 } 
 from '../actionType/actionType';

export const uploadImages = (state = [], action) => {
    switch (action.type) {
        case actionType.UPLOAD_IMAGES:
           return {...state,imagesDetail:action.payload};
        
        default: return state;
    }

}

