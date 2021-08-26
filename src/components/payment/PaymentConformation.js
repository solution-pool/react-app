import React, { useEffect, useState } from "react";
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
import {
  getPostPrice,
  postUserPostSubscr,
  PurchaseTippTradePoint,
  openPayTypeSelectModal,
  checkedAddTippPoint,
} from "../../store/actions/userAmt";
import PaymentOption from "./PaymentOption";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SubscriptionDuration from "./SubscriptionDuration";
import AddTippPoints from "./AddTippPoints";
import { post } from "superagent";

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

export default function AlertDialogSlide({
  postAmt,
  post_id,
  post_type,
  post_user_id,
}) {
  const history = useHistory();
  const [post_types, setPost_Type] = useState(post_type);
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("a");
  const [showHideAddPointComp, setShowHideAddPointComp] = React.useState(false);
  const dispatch = useDispatch();
  const userAmtReducer = useSelector((state) => state.userAmtReducer.userAmt);
  const userSubscPostDuraWithPrice = useSelector(
    (state) => state.userAmtReducer.userSubscPostDuraWithPrice
  );
  const userPurchaseTippPoint = useSelector(
    (state) => state.userAmtReducer.userPurchaseTippPoint
  );
  const payTypeSelectModal = useSelector(
    (state) => state.userAmtReducer.payTypeSelectModal
  );
  const checkAddTippPoint = useSelector(
    (state) => state.userAmtReducer.checkAddTippPoint
  );
  const userPostDetails = useSelector(
    (state) => state.userAmtReducer.userSubscPostDetails
  );

  console.log("userPurchaseTippPoint123", userPurchaseTippPoint.tippTradePoint);

  console.log("checkAddTippPoint", checkAddTippPoint);
  console.log("userSubscPostDuraWithPrice", userSubscPostDuraWithPrice);

  const handleChange = (event) => {
    // swal("Payment type?", {
    //   buttons: ["Cancel", "confirm"],
    // });
    setSelectedValue(event.target.value);

    localStorage.setItem("paymentMode", event.target.value);
    setStatus(true);
  };

  useEffect(() => {
    if (payTypeSelectModal && userPurchaseTippPoint.type === 1) {
      dispatch(checkedAddTippPoint({ checkedAddTippPoints: "", type: "" }));

      setOpen(payTypeSelectModal);
      setPost_Type(6);
    }
  }, [payTypeSelectModal]);

  const handleClickOpen = () => {
    dispatch(openPayTypeSelectModal(false));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(openPayTypeSelectModal(false));

    dispatch(
      PurchaseTippTradePoint({
        tippTradePoint: "",
        type: "",
        subsType: "",
        subPlanId: "",
      })
    );
    setShowHideAddPointComp(false);
  };

  /*Calls function according to post type*/
  const callsFunAccToPostType = () => {
    post_type === 6 ? oneTimeSubscri() : getSubsciption();
  };

  /*User Get Subscription*/
  const getSubsciption = () => {
    const obj = {
      user_id: localStorage.getItem("userId"),
      post_id: post_id,
      post_type: post_type,
      post_amount_type: 3,
      post_user_id: post_user_id,
      post_amount:
        post_type === 6
          ? parseInt(userPurchaseTippPoint.tippTradePoint) / 10
          : postAmt,
    };

    console.log("objs", obj);
    axios
      .post(
        process.env.REACT_APP_API_URL + `/savesubpost`,
        {
          user_id: localStorage.getItem("userId"),
          post_id: post_id,
          post_type: post_type,
          post_amount_type: 3,
          post_user_id: post_user_id,
          post_amount:
            post_type === 6
              ? parseInt(userPurchaseTippPoint.tippTradePoint) / 10
              : postAmt,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.status) {
          history.push("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  /*Get one time subscription*/
  const oneTimeSubscri = () => {
    axios
      .post(
        process.env.REACT_APP_API_URL + `/insertonetimesubscription`,
        {
          user_id: localStorage.getItem("userId"),
          post_user_id: post_user_id,
          subs_plan_user_id: post_user_id,
          subs_plan_type:
            userPurchaseTippPoint.subsType !== ""
              ? userPurchaseTippPoint.subsType
              : "",
          suscription_plan_id:
            userPurchaseTippPoint.subPlanId !== ""
              ? userPurchaseTippPoint.subPlanId
              : "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        history.push("/");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const showHideAddPointsComp = () => {
    setShowHideAddPointComp(!showHideAddPointComp);
    showHideAddPointComp &&
      dispatch(
        PurchaseTippTradePoint({
          tippTradePoint: "",
          type: "",
          subsType: "",
          subPlanId: "",
        })
      );
  };

  // console.log("detials123",userAmtReducer.UserAccountDetails.allTriptadePoint,postAmt ? 1 : 0+' '+postAmt );
  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {post_types === 2 ? "Pay" : "Get Subscription"}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        PaperComponent={PaperComponent}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {/* {"Use Google's location service?"} */}
        </DialogTitle>
        <DialogContent style={{ width: "" }}>
          <DialogContentText id="alert-dialog-slide-description">
            {/* Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running. */}
            <Grid container style={{ alignItems: "center" }}></Grid>
            {/* { 
              <span style={{ color: "red" }}>
                {  post_type === 6  && selectedValue === "a"
                  ?  userAmtReducer.UserAccountDetails.tripPointsd < 200 && "You are short of 200 points add more points."
                  : selectedValue === "b"
                  ? ""
                  : selectedValue !== "a"
                  ? ""
                  : "dsfsdfsdfsdfsdfsdf" }
              </span>
            } */}

            {
              <span style={{ color: "red" }}>
                {userAmtReducer.UserAccountDetails !== undefined
                  ? post_types === 6 &&
                    userAmtReducer.UserAccountDetails.allTriptadePoints < 200
                    ? "You are short of 200 points add more points."
                    : ""
                  : ""}
              </span>
            }

            {userAmtReducer.UserAccountDetails !== undefined ? (
              post_types === 6 &&
              userAmtReducer.UserAccountDetails.allTriptadePoints < 200 ? (
                <button
                  onClick={showHideAddPointsComp}
                  style={{
                    marginLeft: "25px",
                    marginRight: showHideAddPointComp ? "110px" : "80px",
                    borderRadius: "20px",
                    background: "#265fc4",
                    color: "#fff",
                    marginBottom: "9px",
                    outline: "none"
                  }}
                >
                {showHideAddPointComp ? 'Close' : 'Add points' }
                </button>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {post_types === 6 && userSubscPostDuraWithPrice.subcDuraPrice != ""
              ? `You need to ${userSubscPostDuraWithPrice.subcDuraPrice} points`
              : ""}
            {userAmtReducer.hasOwnProperty("UserAccountDetails") &&
              userAmtReducer.UserAccountDetails.allTriptadePoints > 0 && (
                <div id="content" style={{ width: "260px" }}>
                  <p>
                    <strong>
                      <TextField
                        inputProps={{ style: { fontSize: 25 } }}
                        disabled
                        label={
                          post_types === 6 ? "Wallet Points" : "Wallet Amount"
                        }
                        defaultValue={
                          post_types === 6
                            ? `${userAmtReducer.UserAccountDetails.allTriptadePoints.toFixed(
                                2
                              )}`
                            : `$ ${(
                                userAmtReducer.UserAccountDetails
                                  .allTriptadePoints / 10
                              ).toFixed(2)}`
                        }
                        variant="filled"
                      />
                    </strong>
                  </p>
                </div>
              )}
            {post_types === 2 && (
              <span style={{ color: "red" }}>
                {userAmtReducer.UserAccountDetails !== undefined
                  ? userAmtReducer.UserAccountDetails.allTriptadePoints / 10 >=
                      postAmt && selectedValue === "a"
                    ? ""
                    : selectedValue === "b"
                    ? ""
                    : selectedValue !== "a"
                    ? ""
                    : "Insufficient balance. Please pay with another mode."
                  : ""}
              </span>
            )}
            <Grid />
            <Grid style={{ alignItems: "center", fontWeight: "bold" }}>
              {checkAddTippPoint.checkedAddTippPoints === "" &&
              post_types === 6 ? (
                <>
                  <Radio
                    checked={selectedValue === "a"}
                    onChange={handleChange}
                    value="a"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "A" }}
                  />
                  Wallet
                </>
              ) : (
                ""
              )}
              {post_types === 2 && (
                <>
                  <Radio
                    checked={selectedValue === "a"}
                    onChange={handleChange}
                    value="a"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "A" }}
                  />
                  Wallet
                </>
              )}
              <Radio
                checked={selectedValue === "d"}
                onChange={handleChange}
                value="d"
                name="radio-button-demo"
                inputProps={{ "aria-label": "D" }}
              />
              Stripe Payment Gateway
            </Grid>
            <Grid
              container
              style={{ alignItems: "center", fontWeight: "bold" }}
            >
              <Radio
                checked={selectedValue === "e"}
                onChange={handleChange}
                value="e"
                name="radio-button-demo"
                inputProps={{ "aria-label": "E" }}
              />
              PayPal Payment Gateway
            </Grid>
          </DialogContentText>
        </DialogContent>
        {post_types === 6 && (
          <SubscriptionDuration post_user_ids={post_user_id} />
        )}
        {post_types === 6 && showHideAddPointComp && <AddTippPoints />}
        {/* <Grid container style={{ alignItems: "center" }}>
           <PaymentOption />
        </Grid> */}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          {post_types === 2 && (
            <Button
              onClick={handleClose}
              color="primary"
              disabled={
                // userAmtReducer.UserAccountDetails !== undefined
                //   ?
                userAmtReducer.UserAccountDetails.allTriptadePoints / 10 >=
                  postAmt && selectedValue === "a"
                  ? ""
                  : selectedValue !== "a"
                  ? ""
                  : "disabled"
                // : ""
              }
            >
              {
                selectedValue !== "a" ? (
                  <Link
                    to={`/payment`}
                    style={{ color: "#3f51b5" }}
                    // getPostPrice(postAmt)
                    // onClick={()=>{dispatch(getPostPrice(postAmt),postUserPostSubscr({user_id:localStorage.getItem('userId'),post_type:value.post_type,post_id : value.nid}))}}
                    onClick={() => {
                      dispatch(
                        postUserPostSubscr({
                          user_id: localStorage.getItem("userId"),
                          postAmt: postAmt,
                          post_type: post_types,
                          post_id: post_id,
                          post_user_id: post_user_id,
                        })
                      );
                    }}
                  >
                    Agree
                  </Link>
                ) : // userAmtReducer.UserAccountDetails !== undefined ? (
                userAmtReducer.UserAccountDetails.allTriptadePoints / 10 >=
                    postAmt && selectedValue === "a" ? (
                  <Link
                    to={`/`}
                    style={{ color: "#3f51b5" }}
                    // getPostPrice(postAmt)
                    // onClick={()=>{dispatch(getPostPrice(postAmt),postUserPostSubscr({user_id:localStorage.getItem('userId'),post_type:value.post_type,post_id : value.nid}))}}
                    onClick={() => {
                      callsFunAccToPostType();
                    }}
                  >
                    Agree
                  </Link>
                ) : (
                  ""
                )

                // : (
                //   ""
                // )
              }
            </Button>
          )}

          {post_types === 6 && (
            <Button
              // onClick={handleClose}
              color="primary"
              disabled={
                // userAmtReducer.UserAccountDetails !== undefined
                //   ?
                userAmtReducer.UserAccountDetails.allTriptadePoints < 200 &&
                selectedValue === "a"
                  ? "disabled"
                  : selectedValue !== "a"
                  ? ""
                  : ""
                // : ""
              }
            >
              {
                selectedValue !== "a" ? (
                  <Link
                    to={`/payment`}
                    style={{ color: "#3f51b5" }}
                    // getPostPrice(postAmt)
                    // onClick={()=>{dispatch(getPostPrice(postAmt),postUserPostSubscr({user_id:localStorage.getItem('userId'),post_type:value.post_type,post_id : value.nid}))}}
                    onClick={() => {
                      dispatch(
                        postUserPostSubscr({
                          user_id: localStorage.getItem("userId"),
                          postAmt: postAmt,
                          post_type: post_types,
                          post_id: post_id,
                          post_user_id: post_user_id,
                        })
                      );
                    }}
                  >
                    Agree
                  </Link>
                ) : //  userAmtReducer.UserAccountDetails !== undefined ?
                userAmtReducer.UserAccountDetails.allTriptadePoints < 200 &&
                  selectedValue === "a" ? (
                  ""
                ) : (
                  <Link
                    to={`/`}
                    style={{ color: "#3f51b5" }}
                    // getPostPrice(postAmt)
                    // onClick={()=>{dispatch(getPostPrice(postAmt),postUserPostSubscr({user_id:localStorage.getItem('userId'),post_type:value.post_type,post_id : value.nid}))}}
                    onClick={() => {
                      callsFunAccToPostType();
                    }}
                  >
                    Agree
                  </Link>
                )

                // :
                //   ""
              }
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

//ofde8247
