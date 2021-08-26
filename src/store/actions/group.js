import {
    actionType
  } from '../actionType/actionType';
  import {
   getGroupNames
  }
    from "../../apiClient";
  

  
  export const getGroupNmList = () => {
    return async (dispatch, state) => {
      const _payload = await getGroupNames();
      dispatch({
        type: actionType.USER_GROUP_NAMES,
        payload: _payload,
      });
    };
  };


  export const showHideGpForm= (status)=>{
    console.log("status",status)
    return{
       type: actionType.SHOW_HIDE_CREATE_GP_FORM,
       payload: status,
     };
 }

export const initialMultiSelect = (passEmpArr)=>{
  return{
     type: actionType.INITIAL_MULTISELECT,
     payload: passEmpArr,
   };
}
  
  
  
  
  
  
  
  
  
  