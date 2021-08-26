import React, { useEffect, memo,useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import ConformationBox from "./ConformationBox";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import { Link } from "react-router-dom";
import { getPostPrice,getUserLevelStatus,getUuserLevelPayBoxStatus } from "../../store/actions/userAmt";
import PaymentOption from "./PaymentOption";
import axios from 'axios';

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

const GoldMemberPayTypeBox = ({ postAmt, showPayBox }) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [selectedValue, setSelectedValue] = useState("a");
  const [renUseDetailComp,setRenUseDetailComp] = useState(0);
  const dispatch = useDispatch();
  const userAmtReducer = useSelector((state) => state.userAmtReducer.userAmt);
  const userLevelChange = useSelector((state) => state.userAmtReducer.userLevelChange);
  const userLevelPayBoxStatus = useSelector((state) => state.userAmtReducer.userLevelPayBoxStatus);
  console.log("userLevelPayBoxStatus",userLevelPayBoxStatus)


  console.log("showPayBox", userLevelChange);
  const handleChange = (event) => {
    // swal("Payment type?", {
    //   buttons: ["Cancel", "confirm"],
    // });
    setSelectedValue(event.target.value);

    localStorage.setItem("paymentMode", event.target.value);
    setStatus(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    console.log("logo", "logo");
    setOpen(showPayBox);
  }, [showPayBox,open]);

  const handleClose = () => {
      dispatch(getUuserLevelPayBoxStatus(false));
    setOpen(false);
    console.log("logo", open);
  };


  const updateMemberLevel = (e,userLevelStatus) => {
      e.preventDefault();
    if (userLevelStatus === 0) {
        dispatch(getUserLevelStatus(1))
      axios
        .post(
          process.env.REACT_APP_API_URL + `/updateUserLevele`,
          {
            user_id: localStorage.getItem("userId"),
            user_type: userLevelStatus == 0 ? 1 : 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.Sucess) {
            // setRenUseDetailComp(1);
            dispatch(getUserLevelStatus(renUseDetailComp+1))
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  console.log("selectedValue123", typeof selectedValue !== "a");
  return (
    <>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Get Subscription
      </Button> */}
      <Dialog
        open={userLevelPayBoxStatus}
        TransitionComponent={Transition}
        keepMounted
        onClose={open}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        PaperComponent={PaperComponent}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {"You want to change the membership Level."}
        </DialogTitle>
        <DialogContent style={{ width: "" }}>
          <DialogContentText id="alert-dialog-slide-description">
            {/* Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running. */}
            <Grid container style={{ alignItems: "center" }}></Grid>
            {userAmtReducer.hasOwnProperty("UserAccountDetails") &&
              userAmtReducer.UserAccountDetails.allTriptadePoints > 0 && (
                <div id="content" style={{ width: "260px" }}>
                  <p>
                    <strong>
                      <TextField
                        inputProps={{ style: { fontSize: 25 } }}
                        disabled
                        label="Wallet Amount"
                        defaultValue={`$ ${userAmtReducer.UserAccountDetails.allTriptadePoints.toFixed(2)/10}`}
                        variant="filled"
                      />
                    </strong>
                  </p>
                </div>
              )}
            {/* <span style={{ color: "red" }}>
              {100 / 10 >= 10 && selectedValue === "a"
                ? ""
                : selectedValue !== "a"
                ? ""
                : "Insufficient balance. Please pay with another mode."}
            </span> */}
            <Grid />
            <Grid
              container
              style={{ alignItems: "center", fontWeight: "bold" }}
            >
              <Radio
                checked={selectedValue === "a"}
                onChange={handleChange}
                value="a"
                name="radio-button-demo"
                inputProps={{ "aria-label": "A" }}
              />
              Wallet
              <Radio
                checked={selectedValue === "d"}
                onChange={handleChange}
                value="d"
                name="radio-button-demo"
                inputProps={{ "aria-label": "D" }}
              />
              Stripe Payment Gateway
            </Grid>
          </DialogContentText>
        </DialogContent>
        {/* <Grid container style={{ alignItems: "center" }}>
           <PaymentOption />
        </Grid> */}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            disabled={
              userAmtReducer.UserAccountDetails.allTriptadePoints/10 >= 10 && selectedValue === "a"
                ? ""
                : selectedValue !== "a"
                ? ""
                : "disabled"
            }
          >
            {selectedValue !== "a" ? (
              <Link
                to={`/payment`}
                style={{ color: "#3f51b5" }}
                onClick={() => {
                  dispatch(getPostPrice(postAmt));
                }}
              >
                Agree
              </Link>
            ) : selectedValue == "a" && 100/10 >= 10 ? (
              <Link
                to={`/`}
                style={{ color: "#3f51b5" }}
                onClick={(e) => {
                  updateMemberLevel(e,0);
                }}
              >
                Agree
              </Link>
            ) : (
              "Agree"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(GoldMemberPayTypeBox);
