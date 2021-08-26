import React, { Component, useEffect, useState, useRef, memo, useMemo } from "react";
import "./../../../App.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  CompositeDecorator,
  convertToRaw,
  EditorState,
  convertFromHTML,
  ContentState,
  Modifier,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { stateFromHTML } from "draft-js-import-html";
import { stateToHTML } from "draft-js-export-html";

import fetch from "isomorphic-fetch";
import axios from "axios";
import { Redirect } from "react-router-dom";
import PostHeader from "../PostHeader";
import { useHistory, useParams } from "react-router-dom";
import { totalNoOfDrafts } from "../../../store/actions/totalNoOfDrafts";
import { Markup } from "interweave";
import { convertToHTML } from "draft-convert";
import renderHTML from "react-render-html";
import {
  addCommunity,
  postCommunity,
  getCommunitiesNames,
} from "../../../store/actions/postCommunity";
import { useSelector, useDispatch } from "react-redux";
import { Multiselect } from "multiselect-react-dropdown";
import GroupDetailDisplay from "../../userProfile/group/GroupDetailDisplay";
import CreateGroup from "../../userProfile/group/CreateGroup";
import { showHideGpForm } from "../../../store/actions/group";
import {
  alreadySeleGroupMems,
  alreadySeleGroup,
  ctDateTime,
} from "../../../utility";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import AdvanceSharePostSettingModal from "../../modal/AdvanceSharePostSettingModal";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 230,
  },
}));

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "Client-ID 6bc24f8c60de6bf");
    const data = new FormData();
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}

const CreatePost = () => {
  const [editPostDetail, setEditPostDetail] = useState([]);
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("");
  const [checked, setChecked] = useState(false);
  const [checkedPaidPost, setCheckedPaidPost] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [btnDisabled, setBtnDisabled] = useState("disabled");
  const [draftUpdate, setDraftUpdate] = useState("0");
  const [storePostType, setStorePostType] = useState(0);
  const [statusChange, setStatusChange] = useState(false);
  const [allFriendClient, setAllFriendClient] = useState([]);
  const [sharePostUserId, setSharePostUserId] = useState([]);
  const [sharePostGroupId, setSharePostGroupId] = useState([]);
  const [postPrice, setPostPrice] = useState("");
  const [bountyPrice, setBountyPrice] = useState("");
  const [sharePostType, setSharePostType] = useState("");
  const [selectMemIds, setSelectedMembIds] = useState([]);
  const [selectGroupIds, setSelectGroupIds] = useState([]);
  const [countSelectedMems, setCountSelectedMems] = useState(0);
  const [zipCode, setZipCode] = useState(0);
  const [subsOptionDisp, setSubsOptionDisp] = useState("");
  const [postSharePer,setPostSharePer] = useState('');
  const multiselectRef = useRef();
  const history = useHistory();
  const { id: postId } = useParams();

  const dispatch = useDispatch();

  const [postExpirType, setPostExpirType] = useState("");
  const [timeTextField, setTimeTextField] = useState(0);
  const [maxTime, setMaxTime] = useState(1);
  const [postExpirTimeValue, setPostExpirTimeValue] = useState("");
  const [postExpirTypeAfter, setPostExpirTypeAfter] = useState("");
  const [subsPostExpiryType, setSubsPostExpiryType] = useState("");
  const [postDuration, setPostDuration] = useState("");

  const postCommunities = useSelector((state) => state.postCommunNameReducer);
  const groupNames = useSelector((state) => state.groupReducer.gpNames);
  const statusGpForm = useSelector((state) => state.groupReducer.status);
  const InitialStateMultiSelect = useSelector(
    (state) => state.groupReducer.InitialStateMultiSelect
  );
  const userLevelType = useSelector((state) => state.userAmtReducer.userType);
  const advPtShareSetting = useSelector((state) => state.advPostShareSetting.advancePostSetting);

  console.log("advPtShareSetting", advPtShareSetting);

  const classes = useStyles();

  {
    /*validate title and get title*/
  }
  const handleChangeInput = (title) => {
    setTitle(title);
    const tittleData = title != null ? title.length : 0;

    if (tittleData != 0) {
      setBtnDisabled("");
    } else {
      setBtnDisabled("disabled");
    }
  };

  const onEditorStateChange = (editorState) => {
    const raw = convertToRaw(editorState.getCurrentContent());
    const html = draftToHtml(raw);
    const tittleData = title != null ? title.length : 0;
    const editorData =
      html.replace(/(<(?!\/)[^>]+>)+(<\/[^>]+>)+/, "").length == 1 ||
      html.replace(/(<(?!\/)[^>]+>)+(<\/[^>]+>)+/, "").length == 9
        ? 0
        : html.replace(/(<(?!\/)[^>]+>)+(<\/[^>]+>)+/, "").length;

    if (tittleData != 0 && editorData != 0) {
      setBtnDisabled("");
    } else {
      setBtnDisabled("disabled");
    }
    setEditorState(editorState);
  };

  {
    /*post submit*/
  }
  const formSubmit = (e) => {
    e.preventDefault();
    {
      /*post update*/
    }
    if (typeof postId !== "undefined") {
      updateDraftDetail(e.type, postId);
    } else {
      {
        /*post create*/
      }
      saveData(e.type);
    }
  };

  {
    /*Draft post*/
  }
  const saveDraft = (e) => {
    {
      /*draft post update*/
    }
    if (typeof postId !== "undefined") {
      updateDraftDetail(e.target.name, postId);
    } else {
      {
        /*post save in draft*/
      }
      saveData(e.target.name);
    }
  };

  {
    /*update post*/
  }
  useEffect(() => {
    if (postId != undefined) {
      axios
        .get(process.env.REACT_APP_API_URL + `/getSinglePosts/${postId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.posts[0].post_type == 3) {
            setStorePostType(response.data.posts[0].post_share_type);
          } else if (response.data.posts[0].post_type == 4) {
            setStorePostType(response.data.posts[0].post_share_type);
          } else {
            setStorePostType(response.data.posts[0].post_type);
          }
          setChecked(response.data.posts[0].nisAnonymous);
          setSelectGroupIds(
            response.data.posts[0].share_post_group_id != undefined
              ? response.data.posts[0].share_post_group_id
              : []
          );
          setSelectedMembIds(
            response.data.posts[0].share_post_user_id != undefined
              ? response.data.posts[0].share_post_user_id
              : []
          );
          setPostPrice(
            response.data.posts[0].post_amount != ""
              ? response.data.posts[0].post_amount
              : ""
          );
          setEditPostDetail(response.data.posts);
          setTitle(response.data.posts[0].vtitle);
          setEditorState(
            EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(response.data.posts[0].vdesc)
              )
            )
          );
          setBtnDisabled("");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setTitle("");
      setEditorState("");
    }
  }, [postId]);

  {
    /*get  group members ids*/
  }
  const onSelectMems = (selectedList, selectedItem) => {
    console.log(selectedList);
    const allClientFriIds = selectedList.map(function (value) {
      return value.id;
    });
    setCountSelectedMems(multiselectRef.current.getSelectedItemsCount());
    setSelectedMembIds(allClientFriIds);
  };

  {
    /*Get group ids*/
  }
  const onSelectGps = (selectedList, selectedItem) => {
    const selectGroupIds = selectedList.map(function (value) {
      return value.group_id;
    });
    setCountSelectedMems(multiselectRef.current.getSelectedItemsCount());
    setSelectGroupIds(selectGroupIds);
  };

  {
    /*Remove group member*/
  }
  const onRemoveMems = (selectedList, removedItem) => {
    multiselectRef.current.renderMultiselectContainer();
    setCountSelectedMems(multiselectRef.current.getSelectedItemsCount());
  };
  {
    /*Remove group*/
  }
  const onRemoveGps = (selectedList, removedItem) => {
    setCountSelectedMems(multiselectRef.current.getSelectedItemsCount());
  };

  {
    /*Create post or post save in draft*/
  }

  //save post details
  const saveData = (reqType) => {
    const objDetails = {
      postDuration: postDuration,
      subsPostExpiryType: subsPostExpiryType,
      postPrice: postPrice,
      postSharePer : postSharePer+'<<<'+storePostType
    };

    console.log("storePostType3333",objDetails)
    const raw = convertToRaw(editorState.getCurrentContent());
    const html = draftToHtml(raw);
    const json = JSON.stringify(raw);

    {
      /*check post share group or direact(one to one)*/
    }
    let sharePtType;
    if (selectGroupIds.length > 0) {
      sharePtType = "group";
    } else {
      if (selectMemIds.length > 0 || parseInt(storePostType) === 3) {
        sharePtType = "direact";
      } else {
        sharePtType = "";
      }
    }

    axios
      .post(
        process.env.REACT_APP_API_URL + "/createPost",
        {
          nuserid: localStorage.getItem("userId"),
          vtitle: title,
          vmetaTitle: "1,2,3",
          vtype: "text",
          vdesc: html,
          vmedia:
            "https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4",
          nisPublished: "1",
          nisAnonymous: checked == true ? 1 : 0,
          post_amount:
            postPrice != "" && storePostType == 2
              ? postPrice
              : bountyPrice != "" && storePostType == 5
              ? bountyPrice
              : postPrice != "" && storePostType == 6
              ? postPrice
              : "",
          post_type:
            storePostType == 3 || storePostType == 4
              ? 3
              : storePostType == 5
              ? 2
              : storePostType,
          isSubscribed: storePostType == 6 || storePostType == 2 ? 1 : "",

          draftStatus: reqType === "draft" ? 1 : 0,
          bactive: "1",
          communitie_other:
            postCommunities.postCommu != undefined &&
            postCommunities.postCommu.id == 1 &&
            postCommunities.postCommu.name,
          communitie_id:
            postCommunities.postCommu != undefined &&
            postCommunities.postCommu.id == 1
              ? 1
              : postCommunities.postCommu.id,
          post_share_type: sharePtType != "" ? sharePtType : "",
          share_post_group_id: selectGroupIds.length > 0 ? selectGroupIds : "",
          share_post_user_id: selectMemIds.length > 0 ? selectMemIds : "",
          isBounty: storePostType == 5 ? 1 : "",
          post_expire_time_type: postExpirType,
          post_expiry_time: postExpirTimeValue,
          post_expire_type: postExpirTypeAfter,
          post_expire_status: "",
          suscription_post_time: storePostType == 6 ? postDuration : "",
          suscription_post_time_type : storePostType == 6 ? subsPostExpiryType : "",
          share_post_percentage :  storePostType == 1 || storePostType == 2 || storePostType == 6  ?  postSharePer : '',
          like_percentage:advPtShareSetting !== undefined ? advPtShareSetting.like !== '' ? advPtShareSetting.like : "" : "",
          paid_percentage:advPtShareSetting !== undefined ? advPtShareSetting.paid !== '' ? advPtShareSetting.paid : "" : "",
          collab_percentage:advPtShareSetting !== undefined ? advPtShareSetting.collab !== '' ? advPtShareSetting.collab : "" : "",


        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setTitle("");
        setEditorState("");
        setPostPrice("");
        setChecked(false);
        setCheckedPaidPost(false);
        if (reqType !== "draft") {
          // setRedirect()
          history.push("/dashboard");
        } else {
          setDraftUpdate(draftUpdate + 1);
          dispatch(totalNoOfDrafts());
          history.push("/draft-post");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  {
    /*update post draft post or normal post*/
  }
  const updateDraftDetail = (reqType, postId) => {
    let sharePtType;
    const raw = convertToRaw(editorState.getCurrentContent());
    const html = draftToHtml(raw);
    const json = JSON.stringify(raw);

    {
      /*check post share group or direact(one to one)*/
    }
    if (selectGroupIds.length > 0) {
      sharePtType = "group";
    } else {
      if (selectMemIds.length > 0) {
        sharePtType = "direact";
      } else {
        sharePtType = "";
      }
    }

    axios
      .post(
        process.env.REACT_APP_API_URL + `/updatePost/${postId}`,
        {
          nuserid: localStorage.getItem("userId"),
          vtitle: title,
          vmetaTitle: "1,2,3",
          vtype: "text",
          vdesc: html,
          vmedia:
            "https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4",
          nisPublished: "1",
          nisAnonymous: checked == true ? 1 : 0,
          post_amount: postPrice != "" && storePostType == 2 ? postPrice : "",
          post_type:
            storePostType == 3 || storePostType == 4 ? 3 : storePostType,
          // isSubscribed : storePostType == 6 ? 1 : '',
          draftStatus: reqType === "draft" ? 1 : 0,
          bactive: "1",
          communitie_other:
            postCommunities.postCommu != undefined &&
            postCommunities.postCommu.id == 1 &&
            postCommunities.postCommu.name,
          communitie_id:
            postCommunities.postCommu != undefined &&
            postCommunities.postCommu.id == 1
              ? 1
              : postCommunities.postCommu.id,
          post_share_type: sharePtType != "" && sharePtType,
          share_post_group_id: selectGroupIds.length > 0 ? selectGroupIds : "",
          share_post_user_id: selectMemIds.length > 0 ? selectMemIds : "",
          // isBounty : bountyPrice != '' && storePostType == 5 ? bountyPrice : '',
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setTitle("");
        setEditorState("");
        setChecked(false);
        setCheckedPaidPost(false);
        if (reqType !== "draft") {
          history.push("/dashboard");
        } else {
          setDraftUpdate(draftUpdate + 1);
          history.push("/draft-post");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  {
    /*Check post created by anonymous user or non-anonymous user */
  }
  const CheckBoxCheck = (value) => {
    if (value) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  {
    /*check post price*/
  }
  const checkPostPrice = (e) => {
    const { value } = e.target;
    if (value <= 50 && userLevelType === 0) {
      console.log("free members");
      setPostPrice(value);
    } else if (value < 100 || (value > 2500 && userLevelType === 1)) {
      setPostPrice(value);
    } else {
      setPostPrice(value);
    }
  };

  {
    /*Get the group members*/
  }
  useEffect(() => {
    try {
      return new Promise(async (res, rej) => {
        let _response = await axios.post(
          process.env.REACT_APP_API_URL + `/getUserClientOrFriendList`,
          {
            user_id: localStorage.getItem("userId"),
            zip_code: zipCode,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        res(setAllFriendClient(_response.data.userFriendList));
      });
    } catch (error) {
      console.log("error >>>", error);
    }
  }, [zipCode]);

  {
    /*On click group inside display group list*/
  }
  const showHideCreateGroFrom = (status, sharePtType) => {
    dispatch(showHideGpForm(status));
  };

  {
    /*search members by zipcode*/
  }
  const searchData = (codeDigit) => {
    if (!isNaN(codeDigit) && codeDigit.length == 5) {
      setZipCode(codeDigit);
    } else {
      if (codeDigit.length > 5) {
        setZipCode(codeDigit);
      } else {
        setZipCode("");
      }
    }
  };

  {
    /*Reset the previous post type */
  }
  const setStore = (val) => {
    setStorePostType(val);
    setSelectGroupIds([]);
    setSelectedMembIds([]);
    setBountyPrice("");
    setPostPrice("");
  };

  //get post expiry type
  const getPostExpirType = (e) => {
    console.log("aaaaaa", e);
    if (e == 0) {
      setTimeTextField(0);
    } else {
      setTimeTextField(e);
    }
    setPostExpirTimeValue("");
    setPostExpirTypeAfter("");
    setPostExpirType(e);
  };

  {
    /*Set post expiry after expiry post time*/
  }
  const setPostExpirTime = (value, dateTime) => {
    if (!isNaN(value) && value > 0 && dateTime == 0) {
      setPostExpirTimeValue(value);
    } else if (value == 0 && dateTime != "") {
      setPostExpirTimeValue(dateTime);
    } else {
      setPostExpirTimeValue("");
    }
  };

  {
    /*Set post expiry after expiry post time*/
  }
  const getPostExpirTypeAfter = (e) => {
    setPostExpirTypeAfter(e);
  };

  /*Display subscription option api*/

  useEffect(() => {
    try {
      return new Promise(async (res, rej) => {
        let _response = await axios.post(
          process.env.REACT_APP_API_URL + `/getSubsPlanDataByUserId`,
          {
            user_id: localStorage.getItem("userId"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (_response.data.status && _response.data.Data.length > 0) {
          // setSubsOptionDisp("1");
          setSubsOptionDisp(_response.data.Data);
        }

        console.log("_response123", _response.data.Data);
        // res(setAllFriendClient(_response.data.userFriendList));
      });
    } catch (error) {
      console.log("error >>>", error);
    }
  }, [localStorage.getItem("userId")]);

  //Add hash tag
  const startPaidContent = (editorState) => {
    console.log("editor123", editorState.length);
    if (editorState) {
      const characterToInsert = " {{}}";
      const currentContent = editorState.getCurrentContent(),
        currentSelection = editorState.getSelection();

      const newContent = Modifier.replaceText(
        currentContent,
        currentSelection,
        characterToInsert
      );

      const newEditorState = EditorState.push(
        editorState,
        newContent,
        "insert-characters"
      );
      setEditorState(newEditorState);
    }
  };

  //remove empty array
  function isEmptyObj(arrObj) {
    return Object.keys(arrObj).length >= 1;
  }


  console.log("postSharePer",postSharePer);

  return (
    <>
      {/* <PostHeader draftdraftUpd={draftUpdate} /> */}
      <div className="row">
        <div
          className={
            statusGpForm
              ? "col-md-8"
              : storePostType == 4
              ? "col-md-8"
              : "col-md-12"
          }
        >
          <div class="d-flex justify-content-end">
          {/* <AdvanceSharePostSettingModal /> */}
            {parseInt(storePostType) === 6 || parseInt(storePostType) === 2 || parseInt(storePostType) === 1 ? (
              <>
                        <AdvanceSharePostSettingModal />

                {/* <div><b>Post Share Percentage</b></div> */}
                <div className="ml-2">
                  {/* <select
                    name="post_expir_type"
                    value={postSharePer}
                    style={{ width: "136px", height: "35px",marginBottom: parseInt(storePostType) === 1 ? "10px" : "" }}
                    onChange={(e) => setPostSharePer(e.target.value)}
                    id="post_expir_type"
                  >
                    <option value=""> --Select-- </option>
                    <option value="5%">5%</option>
                    <option value="10%">10%</option>
                    <option value="15%">15%</option>
                    <option value="20%">20%</option>
                    <option value="25%">25%</option>
                  </select> */}
                  {/* <div class="form-group"> */}
                {/* <input
                  type="text"
                  name="sharePostPer"
                  value={postSharePer}
                  onChange={(e) =>
                    setPostSharePer(
                      !isNaN(e.target.value) ? parseInt(e.target.value)  <=100 ? e.target.value : ""  : ""
                    )
                  }
                  // class="form-control"
                  placeholder="Enter Percentage"
                  autoComplete="off"
                  style={{ width: "136px", height: "35px",marginBottom: parseInt(storePostType) === 1 ? "10px" : "" }}

                /> */}
              {/* </div> */}
                  {parseInt(storePostType) !== 1 &&
                  <button
                    type="submit"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Create paid hidden text!"
                    className="btn btn-success"
                    style={{
                      background: "#008CBA",
                      height: "35px",
                      marginBottom: "4px",
                      marginLeft: "7px",
                      // marginTop: "-22px",
                    }}
                    onClick={() => startPaidContent(editorState)}
                  >
                    Start Paid Text
                  </button>
                 }
                </div>
              </>
            ) :( ""
         
            )
            }
          </div>

          <form onSubmit={(e) => formSubmit(e)}>
            <div className="_2wyvfFW3oNcCs5GVkmcJ8z">
              <div class="form-group">
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => handleChangeInput(e.target.value)}
                  class="form-control"
                  placeholder="Title"
                  autoComplete="off"
                />
              </div>
            </div>
            <div
              class="form-group"
              style={{ minHeight: "250px", border: "1px solid #ced4da" }}
            >
              <Editor
                editorState={editorState}
                placeholder="Put your content here..."
                onEditorStateChange={onEditorStateChange}
                spellCheck={true}
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                  image: {
                    uploadCallback: uploadImageCallBack,
                    alt: { present: true, mandatory: true },
                  },
                }}
              />
            </div>

            <div className="d-flex px-3">
              <div
                className="custom-checkbox flex-fill ml-2"
                style={{ width: "162px" }}
              >
                <input
                  id="chk1"
                  type="checkbox"
                  onChange={() => CheckBoxCheck(checked)}
                  checked={checked}
                  name="chk1"
                  class="custom-control-input"
                />
                <label htmlFor="chk1" class="custom-control-label text-sm">
                  Post anonymous
                </label>
              </div>
              <div>
                <b>Post Expiry Time</b>
              </div>
              <div className="flex-fill ml-2">
                <select
                  name="post_expir_type"
                  value={postExpirType}
                  style={{ width: "100px", height: "49px" }}
                  onChange={(e) => getPostExpirType(e.target.value)}
                  id="post_expir_type"
                >
                  <option value="0">Select</option>
                  <option value="1">Minutes</option>
                  <option value="2">Hours</option>
                  <option value="3">Days</option>
                  <option value="4">Weeks</option>
                  <option value="5">Months</option>
                  <option value="6">Custom date time</option>
                </select>
              </div>
              {/* <div style={{ display: timeTextField > 0 &&  timeTextField < 6? "block" : "none" }}> */}
              <div
                className="flex-fill ml-2"
                style={{
                  display:
                    timeTextField > 0 && timeTextField < 6 ? "block" : "none",
                }}
              >
                <input
                  style={{
                    width: "100px",
                    height: "49px",
                    border: postExpirTimeValue != "" ? "" : "2px solid red",
                  }}
                  type="text"
                  id="Post_expir_time"
                  name="Post_expir_time"
                  value={postExpirTimeValue}
                  onChange={(e) => setPostExpirTime(e.target.value, 0)}
                  autoComplete="off"
                  placeholder="Enter time"
                />
              </div>
              <div
                style={{ display: timeTextField > 5 ? "block" : "none" }}
                className={classes.container}
                noValidate
              >
                <TextField
                  id="datetime-local"
                  label="Enter expiry time"
                  type="datetime-local"
                  // defaultValue="2017-05-24T10:30"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // inputProps={{
                  //   min: new Date()
                  // }}
                  value={postExpirTimeValue}
                  onChange={(e) => setPostExpirTime(0, e.target.value)}
                  inputProps={{ min: ctDateTime() }}
                  // minDate={new Date()}
                />
              </div>

              <div
                className="flex-fill ml-2"
                style={{ display: timeTextField > 0 ? "block" : "none" }}
              >
                <div>
                  <b>After Post Expiry </b>
                </div>
                <select
                  name="postExpiryType"
                  value={postExpirTypeAfter}
                  style={{ width: "100px", height: "49px" }}
                  onChange={(e) => getPostExpirTypeAfter(e.target.value)}
                  id="post_expir_type"
                >
                  <option value="">Select</option>
                  <option value="0">Public</option>
                  <option value="1">Free</option>
                  <option value="2">Private</option>
                </select>
              </div>
              {/* </div> */}
              <div className="flex-fill ml-2">
                <select
                  name="post_type"
                  value={storePostType}
                  style={{ width: "120px", height: "49px" }}
                  onChange={(e) => setStore(e.target.value)}
                  id="post_type"
                >
                  {/* <option value="" >-- Select the post type --</option> */}
                  <option
                    value="0"
                    selected={0 == storePostType ? "selected" : ""}
                  >
                    Public
                  </option>
                  <option
                    value="1"
                    selected={1 == storePostType ? "selected" : ""}
                  >
                    Free
                  </option>
                  <option
                    value="2"
                    selected={2 == storePostType ? "selected" : ""}
                  >
                    Paid
                  </option>
                  <option
                    value="3"
                    selected={3 == storePostType ? "selected" : ""}
                  >
                    Private
                  </option>
                  <option
                    value="4"
                    selected={4 == storePostType ? "selected" : ""}
                    onClick={() => showHideCreateGroFrom(!statusGpForm)}
                  >
                    Group
                  </option>
                  <option
                    value="5"
                    selected={5 == storePostType ? "selected" : ""}
                  >
                    Bounty
                  </option>
                  {subsOptionDisp != "" &&
                  subsOptionDisp.filter(isEmptyObj).length > 0 ? (
                    <option
                      value="6"
                      selected={6 == storePostType ? "selected" : ""}
                    >
                      Subscription
                    </option>
                  ) : (
                    <option
                      value="7"
                      selected={7 == storePostType ? "selected" : ""}
                    >
                      Subscription
                    </option>
                  )}
                </select>
              </div>
              {/* <div className={classes.container} noValidate>
                <TextField
                  id="datetime-local"
                  label="Enter expiry time"
                  type="datetime-local"
                  // defaultValue="2017-05-24T10:30"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={postExpirTimeValue}
                  onChange={(e) => setPostExpirTime(e.target.value)}
                  minDate={new Date()}
                />
              </div> */}
              {/* {storePostType == 6 && (
                <div className="flex-fill ml-2">
                  <div style={{ width: "100px", height: "25px" }}>
                    <select
                      name="postExpiryType"
                      value={subsPostExpiryType}
                      style={{ width: "100px", height: "49px" }}
                      onChange={(e) => setSubsPostExpiryType(e.target.value)}
                      id="post_expir_type"
                    >
                      <option value="">Select</option>
                      <option value="1">Days</option>
                      <option value="2">Months</option>
                      <option value="3">Quarters</option>
                      <option value="4">Years</option>
                    </select>
                  </div>
                </div>
              )} */}

              {subsPostExpiryType != "" && (
                <div className="flex-fill ml-2">
                  <div style={{ width: "100px", height: "25px" }}>
                    <input
                      type="text"
                      name="postDuration"
                      value={postDuration}
                      // onBlur={(e) => checkPostPrice(e)}
                      onChange={(e) =>
                        setPostDuration(
                          !isNaN(e.target.value) ? e.target.value : ""
                        )
                      }
                      class="form-control"
                      placeholder="Duration"
                      style={{
                        width: "100px",
                        border: postDuration == "" ? "px solid red" : "",
                      }}
                    />
                  </div>
                  <br />
                </div>
              )}

              {(storePostType == 2 || subsPostExpiryType != "") && (
                <div className="flex-fill ml-2">
                  <div style={{ width: "100px", height: "25px" }}>
                    <input
                      type="text"
                      name="title"
                      value={postPrice}
                      onBlur={(e) => checkPostPrice(e)}
                      onChange={(e) =>
                        setPostPrice(
                          !isNaN(e.target.value) ? e.target.value : ""
                        )
                      }
                      class="form-control"
                      placeholder=" Price"
                      style={{
                        width: "100px",
                        border: postPrice == "" ? "px solid red" : "",
                      }}
                    />
                  </div>
                  <br />
                </div>
              )}

              {storePostType == 3 && (
                <div className="flex-fill ml-2">
                  <div
                    style={{
                      width: "300px",
                      height: "49px",
                      background: "#fff",
                    }}
                  >
                    <Multiselect
                      options={allFriendClient} // Options to display in the dropdown
                      displayValue={"name"} // Property name to display in the dropdown options
                      // displayValue="SubName"// Property name to display in the dropdown options
                      showCheckbox={true}
                      onSelect={onSelectMems} // Function will trigger on select event
                      onRemove={onRemoveMems} // Function will trigger on remove event
                      closeOnSelect={false}
                      placeholder={"Search..."}
                      emptyRecordMsg={"No member available"}
                      onSearch={searchData}
                      ref={multiselectRef}
                      selectedValues={alreadySeleGroupMems(
                        allFriendClient,
                        selectMemIds,
                        postId
                      )}
                    />
                  </div>
                </div>
              )}
              {storePostType == 4 && (
                <div className="flex-fill ml-2">
                  <div
                    style={{
                      width: "200px",
                      height: "49px",
                      background: "#fff",
                    }}
                  >
                    <Multiselect
                      options={groupNames.userGroupList} // Options to display in the dropdown
                      displayValue={"group_name"} // Property name to display in the dropdown options
                      showCheckbox={true}
                      onSelect={onSelectGps} // Function will trigger on select event
                      onRemove={onRemoveGps} // Function will trigger on remove event
                      closeOnSelect={false}
                      placeholder={"Search..."}
                      disablePreSelectedValues={false}
                      emptyRecordMsg={"No group available"}
                      ref={multiselectRef}
                      selectedValues={alreadySeleGroup(
                        groupNames.userGroupList,
                        selectGroupIds,
                        postId
                      )}
                    />
                  </div>
                </div>
              )}

              {storePostType == 5 && (
                <div className="flex-fill ml-2">
                  <div style={{ width: "100px", height: "25px" }}>
                    <input
                      type="text"
                      name="title"
                      value={bountyPrice}
                      onChange={(e) =>
                        setBountyPrice(
                          !isNaN(e.target.value) ? e.target.value : ""
                        )
                      }
                      class="form-control"
                      placeholder=" price"
                      autoComplete="off"
                    />
                  </div>
                  <br />
                </div>
              )}

              <div className="flex-fill ml-2" style={{ width: "300px" }}>
                <button
                  type="button"
                  name="draft"
                  className="btn btn-primary mr-3"
                  onClick={(e) => saveDraft(e)}
                  style={{
                    background: "#fff",
                    color: "rgb(93 144 144 / 47%)",
                    height: "49px",
                  }}
                  disabled={
                    postCommunities.postCommu != undefined &&
                    postCommunities.postCommu.name != ""
                      ? btnDisabled
                      : "disabled"
                  }
                >
                  SAVE DRAFT
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  style={{ background: "#32658a", height: "49px" }}
                  disabled={
                    postCommunities.postCommu != undefined &&
                    postCommunities.postCommu.name != "" &&
                    !timeTextField &&
                    title != "" &&
                    editorState != ""
                      ? storePostType == 2
                        ? postPrice != "" &&
                          postPrice <= 50 &&
                          userLevelType === 0
                          ? btnDisabled
                          : postPrice != "" && userLevelType === 1
                          ? (userLevelType === 1 && postPrice < 100) ||
                            postPrice > 2500
                            ? "disabled"
                            : ""
                          : "disabled"
                        : storePostType == 4
                        ? countSelectedMems != 0
                          ? btnDisabled
                          : sharePostGroupId.length > 0 && postId != undefined
                          ? btnDisabled
                          : "disabled"
                        : // : storePostType == 6 && subsPostExpiryTime !='' ? '' : "disabled"

                        storePostType == 5 && bountyPrice == ""
                        ? "disabled"
                        : storePostType == 7
                        ? subsOptionDisp.filter(isEmptyObj).length === 0
                          ? "disabled"
                          : ""
                        : ""
                      : timeTextField
                      ? postExpirTimeValue != "" &&
                        postExpirTypeAfter != "" &&
                        storePostType != 4
                        ? storePostType == 2
                          ? postPrice != "" && postPrice <= 50
                            ? btnDisabled
                            : " "
                          : storePostType == 5 && bountyPrice == ""
                          ? "disabled"
                          : ""
                        : storePostType == 4 &&
                          countSelectedMems > 0 &&
                          postExpirTimeValue != "" &&
                          postExpirTypeAfter != ""
                        ? ""
                        : "disabled"
                      : "disabled"
                  }
                >
                  POST
                </button>
                {/* <button type="button">POST</button> */}
                {/* && postPrice != '' && postPrice <= 50 */}
              </div>
            </div>
            <div className="mb-4">
              {storePostType == 2 && (
                <div className="d-flex justify-content-center">
                  {postPrice != "" && postPrice > 50 && userLevelType === 0 && (
                    <span style={{ color: "red" }}>
                      Please enter post price less then $50{" "}
                    </span>
                  )}
                  {postPrice != "" &&
                    userLevelType === 1 &&
                    (postPrice < 100 || postPrice > 2500) && (
                      <span style={{ color: "red" }}>
                        Please enter post price more then or equal $100 but less
                        then $2500{" "}
                      </span>
                    )}
                  {/* {storePostType == 7 &&
                    <span style={{ color: "red" }}>
                    Create post need to have subscription setup for the creator{" "}
                  </span>
                  } */}
                  {/* {postPrice != "" && (postPrice > 50 && userLevelType  === 0)
                  ?
                  <span style={{ color: "red" }}>
                      Please enter post price less then $50{" "}
                    </span>
                    :
                    postPrice != "" && postPrice < 100 || postPrice > 2500 && userLevelType === 1 
                    ?
                    <span style={{ color: "red" }}>
                      Please enter post price more then or equal $100 but less then $2500{" "}
                    </span>
                    :''
                } */}
                </div>
              )}
              <div className="d-flex justify-content-center">
                {storePostType == 7 && (
                  <span style={{ color: "red" }}>
                    Create post need to have subscription setup for the creator{" "}
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>
        <div
          className="col-md-4"
          style={{
            borderLeft: statusGpForm ? "2px solid #cac4c4" : "",
            minHeight: statusGpForm ? "200px" : "",
            display: statusGpForm ? "block" : "none",
          }}
        >
          <CreateGroup />
        </div>
        {storePostType == 4 && !statusGpForm && (
          <div
            className="col-md-4"
            style={{
              borderLeft: "2px solid #cac4c4",
              minHeight: "200px",
              display: "block",
            }}
          >
            <GroupDetailDisplay />
          </div>
        )}
      </div>
    </>
  );
};
// }

export default memo(CreatePost);
