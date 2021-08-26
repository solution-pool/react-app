import {
    actionType
 } from '../actionType/actionType';
 
 export const uploadImages = (data)=> {
    return {
       type: actionType.UPLOAD_IMAGES,
       payload:data
    }
 }
 

 