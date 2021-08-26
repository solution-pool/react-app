import React, { useState, useCallback, useEffect, useRef, memo } from "react";
import CKEditor from "react-ckeditor-component";
import "./../../../App.css";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import PostHeader from "./../PostHeader";
import { useSelector, useDispatch } from "react-redux";
import { hideHeader, uploadImages } from "../../../store/actions/uploadImages";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import CreateGroup from "../../userProfile/group/CreateGroup";
import GroupDetailDisplay from "../../userProfile/group/GroupDetailDisplay";
import { Multiselect } from "multiselect-react-dropdown";
import { getGroupNmList, showHideGpForm } from "../../../store/actions/group";
import {
  alreadySeleGroupMems,
  alreadySeleGroup,
  ctDateTime,
} from "../../../utility";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

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

const MediaContent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: postId } = useParams();
  const multiselectRef = useRef();

  const [content, setContent] = useState({ content: "content" });
  const imagesStore = useSelector((state) => state.uploadImages.imagesDetail);
  const [file, setFile] = useState({ files: [] });
  const [fileNames, setFileNames] = useState([]);
  const [dragDrop, setDragDrop] = useState(0);
  const [title, setTitle] = useState("");
  const [btnDisabled, setBtnDisabled] = useState("");
  const [checked, setChecked] = useState(false);
  const [storePostType, setStorePostType] = useState(0);
  const [sharePostUserId, setSharePostUserId] = useState([]);
  const [sharePostGroupId, setSharePostGroupId] = useState([]);

  const [postPrice, setPostPrice] = useState("");
  const [bountyPrice, setBountyPrice] = useState("");
  const [files, setFiles] = useState([]);
  const [imgStore, setImgStore] = useState("");
  const [allFriendClient, setAllFriendClient] = useState([]);
  const [sharePostType, setSharePostType] = useState("");
  const [selectMemIds, setSelectedMembIds] = useState([]);
  const [selectGroupIds, setSelectGroupIds] = useState([]);
  const [countSelectedMems, setCountSelectedMems] = useState(0);
  const [zipCode, setZipCode] = useState(0);

  const [postExpirType, setPostExpirType] = useState("");
  const [timeTextField, setTimeTextField] = useState(false);
  const [maxTime, setMaxTime] = useState(1);
  const [postExpirTimeValue, setPostExpirTimeValue] = useState("");
  const [postExpirTypeAfter, setPostExpirTypeAfter] = useState("");

  const [subsPostExpiryType, setSubsPostExpiryType] = useState("");
  const [postDuration, setPostDuration] = useState("");
  const [subsOptionDisp,setSubsOptionDisp] = useState("");
  const [postSharePer,setPostSharePer] = useState('');

  const postCommunities = useSelector((state) => state.postCommunNameReducer);
  const groupNames = useSelector((state) => state.groupReducer.gpNames);
  const statusGpForm = useSelector((state) => state.groupReducer.status);
  const userLevelType = useSelector((state) => state.userAmtReducer.userType);

  const classes = useStyles();

  {
    /*Destructure the useDropzon predefine object */
  }
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,audio/*,video/*",
    onDrop: (acceptedFiles) => {
      // setFiles(
      const filesArray = Array.from(acceptedFiles).map(
        (file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            filename: file.name,
            filetype: file.type,
          })
        // )
      );
      setFiles((prevImages) => prevImages.concat(filesArray));
      setImgStore("");
    },
  });

  {
    /* new image set in files array(iterate array)*/
  }
  const images = files.map((file) => (
    <div key={file.name} className="d-inline-flex justify-content-center">
      {file.type == "video/mp4" || file.type == "video/exe" ? (
        <video
          style={{
            width: "84px",
            height: "84px",
            margin: "6px",
            opacity: "1",
            width: "84px",
            border: "2px solid #898989",
            borderRadius: "7px",
            padding: "4px",
          }}
          controls
        >
          <source src={file.preview} type={file.type} />
        </video>
      ) : (
        <img
          src={file.preview}
          style={{
            width: "84px",
            height: "84px",
            margin: "6px",
            opacity: "1",
            width: "84px",
            border: "2px solid #898989",
            borderRadius: "7px",
            padding: "4px",
          }}
          alt="preview"
        />
      )}
    </div>
  ));

  {
    /*already insert image store in imgStore array*/
  }
  const editImgStore =
    imgStore.length > 1 &&
    imgStore.split(",").map((value) =>
      value.match(/[^/]+(jpg|png|gif|jfif)$/) != null
        ? value != "" && (
            <img
              src={value}
              style={{
                width: "84px",
                height: "84px",
                margin: "6px",
                opacity: "1",
                width: "84px",
                border: "2px solid #898989",
                borderRadius: "7px",
                padding: "4px",
              }}
              alt="preview"
            />
          )
        : value != "" && (
            <video
              style={{
                width: "84px",
                height: "84px",
                margin: "6px",
                opacity: "1",
                width: "84px",
                border: "2px solid #898989",
                borderRadius: "7px",
                padding: "4px",
              }}
              controls
            >
              <source src={value} />
            </video>
          )
    );

  {
    /*GET edit detail*/
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
          console.log("reponseDetails", response.data.posts[0]);
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
          setTitle(response.data.posts[0].vtitle);
          setImgStore(response.data.posts[0].vmedia);
          console.log(
            "response",
            response.data.posts[0].vmedia.split(",").map((value) => value)
          );

          setBtnDisabled("");
          const imageStore = files.map((file) => (
            <div
              key={file.name}
              className="d-inline-flex justify-content-center"
            >
              {file.type == "video/mp4" || file.type == "video/exe" ? (
                <video
                  style={{
                    width: "84px",
                    height: "84px",
                    margin: "6px",
                    opacity: "1",
                    width: "84px",
                    border: "2px solid #898989",
                    borderRadius: "7px",
                    padding: "4px",
                  }}
                  controls
                >
                  <source src={file.preview} type={file.type} />
                </video>
              ) : (
                <img
                  src={file.preview}
                  style={{
                    width: "84px",
                    height: "84px",
                    margin: "6px",
                    opacity: "1",
                    width: "84px",
                    border: "2px solid #898989",
                    borderRadius: "7px",
                    padding: "4px",
                  }}
                  alt="preview"
                />
              )}
            </div>
          ));
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setTitle("");
    }
  }, [postId]);

  {
    /*get  group members ids*/
  }
  const onSelectMems = (selectedList, selectedItem) => {
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
    setCountSelectedMems(multiselectRef.current.getSelectedItemsCount());
  };
  {
    /*Remove group*/
  }
  const onRemoveGps = (selectedList, removedItem) => {
    setCountSelectedMems(multiselectRef.current.getSelectedItemsCount());
  };

  {
    /*Get expiry type*/
  }
  const getPostExpirType = (e) => {
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
    /*Get expiry time*/
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
    /*Get expiry time*/
  }
  const getPostExpirTypeAfter = (e) => {
    console.log(e);
    setPostExpirTypeAfter(e);
  };

  {
    /*Create or update post data*/
  }
  const formSubmit = (e) => {
    e.preventDefault();
    let sharePtType;
    let backendFunt;
    if (selectGroupIds.length > 0) {
      sharePtType = "group";
    } else {
      if (selectMemIds.length > 0) {
        sharePtType = "direact";
      } else {
        sharePtType = "";
      }
    }

    if (title.length != 0) {
      const formData = new FormData();
      if (imgStore.length > 0 && postId != undefined) {
        console.log("backendFunt", imgStore);
        formData.append(`oldMedia`, imgStore);
      } else {
        for (let i = 0; i < files.length; i++) {
          console.log("backendFunt", files);
          formData.append(`vmedia[${i}]`, files[i]);
        }
      }

      formData.append("nuserid", localStorage.getItem("userId"));
      formData.append("vtitle", title);
      formData.append("vtype", "media");
      formData.append("draftStatus", 0);
      formData.append("nisPublished", 1);
      formData.append("bactive", 1);
      formData.append("nisAnonymous", checked == true ? 1 : 0);
      formData.append(
        "post_type",
        storePostType == 3 || storePostType == 4
          ? 3
          : storePostType == 5
          ? 2
          : storePostType
      );
      formData.append(
        "post_amount",
        postPrice != "" && storePostType == 2
          ? postPrice
          : bountyPrice != "" && storePostType == 5
          ? bountyPrice
          : ""
      );
      formData.append(
        "communitie_other",
        postCommunities.postCommu != undefined &&
          postCommunities.postCommu.id == 1 &&
          postCommunities.postCommu.name
      );
      formData.append(
        "communitie_id",
        postCommunities.postCommu != undefined &&
          postCommunities.postCommu.id == 1
          ? 1
          : postCommunities.postCommu.id
      );
      formData.append("post_share_type", sharePtType != "" && sharePtType);
      formData.append("isBounty", storePostType == 5 ? 1 : "");
      formData.append("post_expire_time_type", postExpirType);
      formData.append("post_expiry_time", postExpirTimeValue);
      formData.append("post_expire_type", postExpirTypeAfter);
      formData.append("share_post_percentage", storePostType == 1 || storePostType == 2 || storePostType == 6  ?  postSharePer : '');

      // formData.append("subsPostDuration", storePostType == 6 ? postDuration : '');
      // formData.append("subsPostExpiryType", storePostType == 6 ? subsPostExpiryType : '');

      for (let i = 0; i < selectMemIds.length; i++) {
        formData.append(`share_post_user_id[${i}]`, selectMemIds[i]);
      }
      for (let i = 0; i < selectGroupIds.length; i++) {
        formData.append(`share_post_group_id[${i}]`, selectGroupIds[i]);
      }

      if (postId != undefined) {
        backendFunt = `/updatePost/${postId}`;
      } else {
        backendFunt = `/createPost/`;
      }
      console.log("backendFunt", backendFunt);
      axios
        .post(process.env.REACT_APP_API_URL + backendFunt, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setTitle("");
          history.push("/dashboard");
          // swal("Post created!", "post created successfully!", "success");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  {
    /*Reset media post content*/
  }
  const cancelMediaData = () => {
    if (title.length != 0 || files.length != 0) {
      setTitle("");
      setFiles([]);
    }
  };

  {
    /*Set media title*/
  }
  const setTitleText = (titleText) => {
    setTitle(titleText);
  };

  {
    /*Check anonymous user or non-anonymous user*/
  }
  const CheckBoxCheck = (value) => {
    if (value) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  {
    /*Validate post paid price*/
  }
  const checkPostPrice = (e) => {
    const { value } = e.target;
    if (value <= 50) {
      setPostPrice(value);
    } else {
      setPostPrice(value);
    }
  };

  {
    /*Get the members*/
  }
  useEffect(() => {
    axios
      .post(
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
      )
      .then((response) => {
        setAllFriendClient(response.data.userFriendList);
      })
      .catch((error) => {
        // console.log(error.message);
      });
  }, [zipCode]);

  const showHideCreateGroFrom = (status) => {
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
    /*Reset preview select group or group members*/
  }
  const setStore = (val) => {
    setStorePostType(val);
    setSelectGroupIds([]);
    setSelectedMembIds([]);
    setBountyPrice("");
    setPostPrice("");
  };

/*Display subscription option api*/
useEffect(()=>{

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

      if(_response.data.status && _response.data.Data.length > 0){
        // setSubsOptionDisp("1");
        setSubsOptionDisp(_response.data.Data);

      }

      // res(setAllFriendClient(_response.data.userFriendList));
    });
  } catch (error) {
    console.log("error >>>", error);
  }
  
},[localStorage.getItem("userId")])

  console.log("selectMemIds", storePostType,subsOptionDisp);

  /*check and remove empty array*/
  function isEmptyObj(arrObj) {
    return Object.keys(arrObj).length >= 1;
  }
  return (
    <>
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
          {parseInt(storePostType) === 6 || parseInt(storePostType) === 2 || parseInt(storePostType) === 1 ? (
              <>
                <div><b>Post Share Percentage</b></div>
                <div className="ml-2">
                <input
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

                />                
                </div>
              </>
            ) :( ""
         
            )}
          </div>

          <form onSubmit={formSubmit}>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                value={title}
                onChange={(e) => setTitleText(e.target.value)}
                placeholder="Title"
              />
            </div>
            <div>
              <div className="App">
                <div
                  {...getRootProps()}
                  style={{
                    display:
                      files.length != "0" || editImgStore != "0"
                        ? "none"
                        : "block",
                  }}
                >
                  <input {...getInputProps()} />
                  <div
                    className="drop-message"
                    style={{
                      color: "#0079D3",
                      border: "1px solid #ced4da",
                      height: "150px",
                    }}
                  >
                    <div className="upload-icon"> </div>
                    Drag and drop images or{" "}
                    <span className="uploadImg">
                      <i className="fa fa-upload"></i> Upload
                    </span>
                  </div>
                </div>
                <div
                  className="drop-message"
                  style={{
                    display:
                      files.length != "0" || editImgStore != "0"
                        ? "block"
                        : "none",
                    color: "#0079D3",
                    border: "1px solid #ced4da",
                    minHeight: "150px",
                  }}
                >
                  <div className="d-flex overflow-auto">
                    {editImgStore != "0" ? editImgStore : images}

                    <div className="d-inline-flex justify-content-center">
                      <p
                        className="d-flex justify-content-center align-items-center"
                        style={{
                          width: "84px",
                          height: "84px",
                          margin: "6px",
                          opacity: "1",
                          width: "84px",
                          border: "2px dotted #898989",
                          borderRadius: "7px",
                          padding: "4px",
                        }}
                        alt="preview"
                      >
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />

                          <i
                            class="fa fa-plus"
                            id="iconStyle"
                            aria-hidden="true"
                          >
                            {" "}
                          </i>
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row px-3  justify-content-between mt-4">
              <div className="custom-control custom-checkbox custom-control-inline">
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
              {/* <div style={{ display: timeTextField ? "block" : "none" }}> */}
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
                  <b>After Post Expiry</b>
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
                  {/* <option
                    value="6"
                    selected={6 == storePostType ? "selected" : ""}
                  >
                    Subscription 
                  </option>*/}
                  {
                   subsOptionDisp != '' &&  subsOptionDisp.filter(isEmptyObj).length > 0 ?
                        <option
                          value="6"
                          selected={6 == storePostType ? "selected" : ""}
                        >
                          Subscription
                        </option>
                        :
                        <option
                          value="7"
                          selected={ 7 == storePostType ? "selected" : ""}
                        >
                          Subscription
                        </option>
                      }
                </select>
              </div>

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
                      <option value="0">Days</option>
                      <option value="1">Months</option>
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
                      name="title"
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
                        border: postPrice == "" ? "px solid red" : "",
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
                      placeholder=" price"
                      style={{
                        width: "100px",
                        border: postPrice == "" ? "2px solid red" : "",
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
                      width: "170px",
                      height: "49px",
                      background: "#fff",
                    }}
                  >
                    <Multiselect
                      options={allFriendClient} // Options to display in the dropdown
                      displayValue="name" // Property name to display in the dropdown options
                      showCheckbox={true}
                      onSelect={onSelectMems} // Function will trigger on select event
                      onRemove={onRemoveMems} // Function will trigger on remove event
                      closeOnSelect={false}
                      placeholder={"Search..."}
                      style={{ height: "4900px" }}
                      ref={multiselectRef}
                      onSearch={searchData}
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
                      width: "170px",
                      height: "49px",
                      background: "#fff",
                    }}
                  >
                    <Multiselect
                      options={groupNames.userGroupList} // Options to display in the dropdown
                      displayValue="group_name" // Property name to display in the dropdown options
                      showCheckbox={true}
                      onSelect={onSelectGps} // Function will trigger on select event
                      onRemove={onRemoveGps} // Function will trigger on remove event
                      closeOnSelect={false}
                      placeholder={"Search..."}
                      style={{ height: "49px" }}
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
              <div className="custom-control custom-checkbox custom-control-inline">
                <button
                  className="btn btn-primary mr-3"
                  style={{
                    background: "#fff",
                    color: "#007bff",
                    fontWeight: "bold",
                  }}
                  onClick={cancelMediaData}
                >
                  {" "}
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  style={{ background: "#32658a" }}
                  disabled={
                    postCommunities.postCommu != undefined &&
                    postCommunities.postCommu.name != "" &&
                    !timeTextField && title !='' && files.length > 0
                      ? storePostType == 2
                        ? postPrice != "" && postPrice <= 50
                          ? btnDisabled
                          :  postPrice != "" && userLevelType === 1 
                          ? userLevelType === 1  &&  postPrice < 100 || postPrice > 2500  ? "disabled"  : "" : "disabled" : storePostType == 4
                        ? countSelectedMems != 0
                          ? btnDisabled
                          : sharePostGroupId.length > 0 && postId != undefined
                          ? btnDisabled
                          : "disabled"
                        : storePostType == 5 && bountyPrice == ""
                        ? "disabled"
                        : storePostType == 7  ? subsOptionDisp.filter(isEmptyObj).length === 0 ? "disabled" : "" : ""
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
              </div>
            </div>
          </form>
          <div className="mb-4">
            {storePostType == 2 && (
              <div className="d-flex justify-content-center">
                {postPrice != "" && postPrice > 50 && (
                  <span style={{ color: "red" }}>
                    Please enter post price less then $50{" "}
                  </span>
                )}
              </div>
            )}
             {postPrice != "" &&
                    userLevelType === 1 &&
                    (postPrice < 100 || postPrice > 2500) && (
                      <span style={{ color: "red" }}>
                        Please enter post price more then or equal $100 but less
                        then $2500{" "}
                      </span>
                    )}
              <div className="d-flex justify-content-center">

              {storePostType == 7 &&
                  <span style={{ color: "red" }}>
                  Create post need to have subscription setup for the creator{" "}
                </span>
                }
                </div>
          </div>
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

export default memo(MediaContent);
