import {
    actionType
 } from '../actionType/actionType';
 
 
 export const closeAboutDetailForm = (formStatus)=> {
    return {
       type: actionType.CLOSE_DESC_FORM,
       payload:formStatus
    }
 }


 export const closeEducaForm = (formStatus)=> {
   return {
      type: actionType.CLOSE_EDUCA_FORM,
      payload:formStatus
   }
}

export const closeAddreForm = (formStatus)=> {
   return {
      type: actionType.CLOSE_ADDRESS_FORM,
      payload:formStatus
   }
}

export const closeProfessForm = (formStatus)=> {
   return {
      type: actionType.CLOSE_PROFESS_FORM,
      payload:formStatus
   }
}

export const closeWorkPlaceForm = (formStatus)=> {
   return {
      type: actionType.CLOSE_WORKPLACE_FORM,
      payload:formStatus
   }
}

export const closeRelaShipForm = (formStatus)=> {
   return {
      type: actionType.CLOSE_RELATIONSHIP_FORM,
      payload:formStatus
   }
}

export const closePhoNoForm = (formStatus)=> {
   return {
      type: actionType.CLOSE_PHONO_FORM,
      payload:formStatus
   }
}


 