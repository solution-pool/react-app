import {
    actionType
 } from '../actionType/actionType';
 
 {/*Re-render comment component*/}
 export const reRenderCommment = (data)=> {
    return {
       type: actionType.RE_RENDER_COMPONENT,
       payload:data++
    }
 }

{/*Re-render display user amount component*/}
export const reRenderUserAmt = ()=> {
    console.log("amount")
   return {
      type: actionType.RE_RENDER_USER_AMT,
   }
}

{/*Re-render user group component*/}
export const reRenderGroupComp = ()=> {
  return {
     type: actionType.RE_RENDER_GROUP_COMP,
  }
}

{/*Accept right ans then re-render bounty comment component*/}
export const reRenderBountyComp = ()=> {
   return {
      type: actionType.RE_RENDER_BOUNTY_COMP,
   }
 }

{/*Accept right ans then re-render bounty comment component*/}
export const reRenderHomeComp = ()=> {
   return {
      type: actionType.RE_RENDER_HOME_COMP,
     // payload:renderNumber
   }
 }
 
 
 