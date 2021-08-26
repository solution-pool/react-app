import React, { useEffect, memo,useState,useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import { Link } from "react-router-dom";
import { getPostPrice} from "../../store/actions/userAmt";
import {sharePostWithFri,friendClientDisplay} from "../../store/actions/sharePostWithFri";
import {reRenderHomeComp} from "../../store/actions/reRenderComponent"
import axios from 'axios';
import { Multiselect } from "multiselect-react-dropdown";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const SharePostWithFriendModal = ({opens,post_share_id,post_creator_id}) => {
  const [open, setOpen] = useState(false);
  const [allFriendClient, setAllFriendClient] = useState([]);
  const [countSelectedMems, setCountSelectedMems] = useState(0);
  const [selectMemIds, setSelectedMembIds] = useState([]);
  const [reRenderHomeCom, setRenderHomeCom] = useState(0);
  const multiselectRef = useRef();



  const dispatch = useDispatch();
  const sharePostReducer = useSelector((state) => state.sharePostReducer.status);
  const groupNames = useSelector((state) => state.groupReducer.gpNames);
  console.log("groupNames",groupNames,"opens",opens,"post_share_id",post_share_id,"post_creator_id",post_creator_id)

  useEffect(() => {
    try {
      return new Promise(async (res, rej) => {
        let _response = await axios.post(
          process.env.REACT_APP_API_URL + `/getUserClientOrFriendList`,
          {
            user_id: localStorage.getItem("userId"),
            type:'share'
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        res(setAllFriendClient(_response.data.userFriendList));
        dispatch(friendClientDisplay(_response.data.userFriendList))
      });
    } catch (error) {
      console.log("error >>>", error);
    }
  }, []);


  const handleClose = () => {
      dispatch(sharePostWithFri(false));
    setOpen(false);
    console.log("logo", open);
  };
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
    /*Remove group member*/
  }
  const onRemoveMems = (selectedList, removedItem) => {
    multiselectRef.current.renderMultiselectContainer();
    setCountSelectedMems(multiselectRef.current.getSelectedItemsCount());
  };
  console.log("SelectedMembIds",selectMemIds,"CountSelectedMems",countSelectedMems)

  const splitSharePost = (e)=>{
    console.log("selectMemIds",selectMemIds,localStorage.getItem('userId'),post_share_id,post_creator_id);
    // alert(selectMemIds);
    try {
      return new Promise(async (res, rej) => {
        let _response = await axios.post(
          process.env.REACT_APP_API_URL + `/splitPostShare`,
          {
            share_by_user_id: parseInt(localStorage.getItem("userId")),
            post_id:post_share_id,
            post_user_id:post_creator_id,
            share_to_user_id: selectMemIds
            
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("_response",_response.status === 201);
        if(_response.status === 201){
          // dispatch(sharePostWithFri(false));
          // setOpen(false);
          handleClose()
          // setRenderHomeCom(reRenderHomeCom+1);
          dispatch(reRenderHomeComp());
        //  window.location.reload();
        }
        // res(setAllFriendClient(_response.data.userFriendList));
        // dispatch(friendClientDisplay(_response.data.userFriendList))
      });
    } catch (error) {
      console.log("error >>>", error);
    }
  }
  //splitPostShare
  return (
    <>
      <Dialog
        open={sharePostReducer}
        TransitionComponent={Transition}
        keepMounted
        onClose={open}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        PaperComponent={PaperComponent}
      >
        <DialogTitle style={{ cursor: "move",minWidth:"475px" }} id="draggable-dialog-title">
          {/* {"Share post with friends."} */}
          {"You want to share this post with friends."}
         
                 
                  
        </DialogTitle>
        <DialogContent style={{ width: "" }}>
          {/* <DialogContentText id="alert-dialog-slide-description"> */}
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
                      // onSearch={searchData}
                      ref={multiselectRef}
                      // style={{minWidth:"0px"}}
                    />
          {/* </DialogContentText> */}
        </DialogContent>
       
        <DialogActions>
        <Button
            onClick={handleClose}
            color="primary"
          >
              <Link
                // to={`/payment`}
                style={{ color: "#3f51b5" }}
               
              >
                Close
              </Link>
          </Button>
          <Button
            onClick={handleClose}
            color={"primary"}
            disabled={allFriendClient.length < 1 ? "disabled" : countSelectedMems === 0 ?  "disabled" : ""} 
            onClick={(e)=>splitSharePost(e)}
          >
              <Link
                // to={`/payment`}
                style={{color: allFriendClient.length < 1 ? "#b1a8a8" :  countSelectedMems === 0 ? "#b1a8a8" : "#3f51b5"}}
               
              >
                Share
              </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(SharePostWithFriendModal);
