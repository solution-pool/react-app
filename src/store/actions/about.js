import {
  actionType
} from '../actionType/actionType';
import {
  getAllCity,
  getAllRelaShip,
  getAllPhoneNo,
  addPhoneNo,
  editAboutDetail,
  getAllStates,
  getCityByStateId,
  getAllProfessions,
  deleteAboutUsDetail,
  phoCountCodeList
}
  from "../../apiClient";

export const addCity = (data) => {
  return {
    type: actionType.ADD_CITY,
    payload: data
  }
}


export const getCity = () => {
  return async (dispatch, state) => {
    const _payload = await getAllCity();
    dispatch({
      type: actionType.GET_CITY,
      payload: _payload,
    });
  };
};


export const getRelaShip = () => {
  return async (dispatch, state) => {
    const _payload = await getAllRelaShip();
    dispatch({
      type: actionType.GET_RELASHIP,
      payload: _payload,
    });
  };
};

export const getPhoneNo = (otherId) => {
  return async (dispatch, state) => {
    const _payload = await getAllPhoneNo(otherId);
    dispatch({
      type: actionType.GET_PHONENO,
      payload: _payload,
    });
  };
};

export const postPhoneNo = (userPhoeObj) => {
  return async (dispatch, state) => {
    const _payload = await addPhoneNo(userPhoeObj);
    dispatch({
      type: actionType.ADD_PHONENO,
      payload: _payload,
    });
  };
};


export const editPostData = (userEditObj) => {
  return async (dispatch, state) => {
    const _payload = await editAboutDetail(userEditObj);
    dispatch({
      type: actionType.EDIT_USER_DETAIL,
      payload: _payload,
    });
  };
};

export const getStateName = (zipCode) => {
  return async (dispatch, state) => {
    const _payload = await getAllStates(zipCode);
    dispatch({
      type: actionType.GET_ALL_STATES,
      payload: _payload,
    });
  };
};

export const getCityNamesByStateId = (stateId) => {
  return async (dispatch, state) => {
    const _payload = await getCityByStateId(stateId);
    dispatch({
      type: actionType.GET_CITY_BY_STATEID,
      payload: _payload,
    });
  };
};


export const getAllProfessionsNames = () => {
  return async (dispatch, state) => {
    const _payload = await getAllProfessions();
    dispatch({
      type: actionType.GET_ALL_PROFESSIONS,
      payload: _payload,
    });
  };
};

export const deleteAboutUsDetailInfo = (aboutMeId) => {
  return async (dispatch, state) => {
    const _payload = await deleteAboutUsDetail(aboutMeId);
    dispatch({
      type: actionType.DELETE_ABOUT_DETAIL,
      payload: _payload,
    });
  };
};


export const getPhoCodeList = () => {
  return async (dispatch, state) => {
    const _payload = await phoCountCodeList();
    dispatch({
      type: actionType.PHONE_COUNTRY_CODE_LIST,
      payload: _payload,
    });
  };
};








