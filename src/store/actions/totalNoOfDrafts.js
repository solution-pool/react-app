import {
    actionType
 } from '../actionType/actionType';
 
 export const totalNoOfDrafts = ()=> {
      return {
       type: actionType.DRAFT_COUNT,
      }
 }

 
