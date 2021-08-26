import {
    actionType
 } from '../actionType/actionType';
 
 export const accodionAction = (formStatus)=> {
    console.log("formStatus",formStatus);
    return {
       type: actionType.ACCORDION_ACTION,
       payload:formStatus
    }
 }