import axios from "axios";

{/*Get all cities*/}
export const getAllCity = async () => {
  const _res = await axios.get(process.env.REACT_APP_API_URL + `/getCityList`,
  {
      headers: {
          "Content-Type": "application/json",
      },
  });
  return _res.data;
};

{/*Get all relationships*/}
export const getAllRelaShip = async () => {
  const _res = await axios.get(process.env.REACT_APP_API_URL + `/getRelationshipList`,
  {
      headers: {
          "Content-Type": "application/json",
      },
  });
  return _res.data;
};

{/*Get user all about details*/}
export const getAllPhoneNo = async () => {
    const _res = await axios.get(process.env.REACT_APP_API_URL + `/getUserById/${localStorage.getItem('otherId') !== localStorage.getItem('userId') ? localStorage.getItem('otherId') : localStorage.getItem('userId')}`,
    {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return _res.data;
};

{/*Get user about details*/}
export const addPhoneNo = async (userDetailObj) => {
    const _res = await axios.post(process.env.REACT_APP_API_URL + `/addAboutUs`,
    userDetailObj,
    {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return _res.data;
};

{/*update user about detail*/}
export const editAboutDetail = async (userEditDetailObj) => {
    const _res = await axios.post(process.env.REACT_APP_API_URL + `/UpdateAboutUs`,
    userEditDetailObj,
    {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return _res.data;
};

{/*Get all communities*/}
export const getAllCommunities = async () => {
    const _res = await axios.get( process.env.REACT_APP_API_URL + `/getcommunitieList`,
    {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return _res.data;
};

{/*Get all states*/}
export const getAllStates = async (zipCode) => {
    const _res = await axios.post( process.env.REACT_APP_API_URL + `/getStateByZipCode`,{
        zipcode:zipCode
    },
    {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return _res.data;
};

{/*Get all city name by state id*/}
export const getCityByStateId = async (stateId) => {
    const _res = await axios.post( process.env.REACT_APP_API_URL + `/getCityByStateCode`,{
        state_id:stateId
    },
    {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return _res.data;
};

{/*Get all professions*/}
export const getAllProfessions = async () => {
    const _res = await axios.get( process.env.REACT_APP_API_URL + `/getProfessionList`,
    {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return _res.data;
};

{/*Delete user about detail*/}
export const deleteAboutUsDetail = async (aboutMeId) => {
    const _res = await axios.post( process.env.REACT_APP_API_URL + `/deleteAboutUs`,{
        about_us_id : aboutMeId,
        user_id : localStorage.getItem('userId')
    },
    {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return _res.data;
};

{/*Get phone no code*/}
export const phoCountCodeList = async () => {
    const _res = await axios.get( process.env.REACT_APP_API_URL + `/phoneCountryCodeList`,
    {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return _res.data;
};

{/*Get user tipptrade point*/}
export const getUserAmt = async () => {
    const _res = await axios.get(process.env.REACT_APP_API_URL + `/getUserAccountDetails/${localStorage.getItem('userId')}`,
    {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return _res.data;
};

{/*Get user tipptrade point*/}
export const getGroupNames = async () => {
    
    const _res = await axios.post(process.env.REACT_APP_API_URL + `/getUserGroupList`, {
        group_admin_id: localStorage.getItem("userId"),
    },
    {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return _res.data;
};






