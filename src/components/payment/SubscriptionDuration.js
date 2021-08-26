import React, { useEffect, memo } from "react";
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
  postSubsDuration,
  PurchaseTippTradePoint
} from "../../store/actions/userAmt";
import PaymentOption from "./PaymentOption";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SubscriptionDuration = ({post_user_ids}) => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("1");
  const [selectedValues, setSelectedValues] = React.useState(1);

  const [subsDuractionPlan, setSubsDuraionPlan] = React.useState([]);
  const dispatch = useDispatch();
  const userAmtReducer = useSelector((state) => state.userAmtReducer.userAmt);

  const handleChange = (event,amount,subsType,subPlanId) => {
  
    let durationObj = { duration: "", subcDuraPrice: "" };
    if (event.target.value === "1") {
      dispatch(PurchaseTippTradePoint({tippTradePoint:10 * amount,type:2,subsType:subsType,subPlanId:subPlanId}))

      durationObj = { duration: 1, subcDuraPrice: 10 * amount,subsType:subsType,subPlanId:subPlanId };
    } else if (event.target.value === "2") {
      dispatch(PurchaseTippTradePoint({tippTradePoint:10 * amount,type:2,subsType:subsType,subPlanId:subPlanId}))

      durationObj = { duration: 2, subcDuraPrice: 10 * amount ,subsType:subsType,subPlanId:subPlanId};
    } else if (event.target.value === "3") {
      dispatch(PurchaseTippTradePoint({tippTradePoint:10 * amount,type:2,subsType:subsType,subPlanId:subPlanId}))

      durationObj = { duration: 3, subcDuraPrice: 10 * amount,subsType:subsType,subPlanId:subPlanId };
    } else if (event.target.value === "4") {
      dispatch(PurchaseTippTradePoint({tippTradePoint:10 * amount,type:2,subsType:subsType,subPlanId:subPlanId}))

      durationObj = { duration: 4, subcDuraPrice: 10 * amount,subsType:subsType,subPlanId:subPlanId };
    } else if (event.target.value === "5") {
      dispatch(PurchaseTippTradePoint({tippTradePoint:10 * amount,type:2,subsType:subsType,subPlanId:subPlanId}))

      durationObj = { duration: 5, subcDuraPrice: 10 * amount,subsType:subsType,subPlanId:subPlanId };
    } else {
      durationObj = { duration: "", subcDuraPrice: "",subsType:"",subPlanId:'' };
    }
    dispatch(postSubsDuration(durationObj));
    console.log("duration", amount);

    setSelectedValue(event.target.value);

    localStorage.setItem("subsc_duration", event.target.value);
    localStorage.getItem("subsc_duration");

    setStatus(true);
  };

  useEffect(() => {
    if (selectedValue === "a") {
      dispatch(postSubsDuration({ duration: 1, subcDuraPrice: 200 }));
    }
  }, [selectedValue]);

  useEffect(() => {
    axios
      .post(process.env.REACT_APP_API_URL + `/getSubsPlanDataByUserId`, {
        user_id: post_user_ids,
      })
      .then((response) => {
        if (response.data.status) {
          setSubsDuraionPlan(response.data.Data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [localStorage.getItem("userId")]);

  useEffect(()=>{
    setSelectedValue(Math.min.apply(Math,subsDuractionPlan.filter(isEmptyObj).map(subsDetails => {
        return subsDetails.subscription_type;
      }
    )))
  
    {/*check first subscription plan bydefault*/}
    {subsDuractionPlan[0] !== undefined && dispatch(PurchaseTippTradePoint({tippTradePoint: 10 * subsDuractionPlan[0].amount,type:2,subsType: subsDuractionPlan[0].subscription_type,subPlanId: subsDuractionPlan[0].id}))}
   
    {/*Display first subscriptin plan tipptrade points*/}
    {subsDuractionPlan[0] !== undefined && dispatch(postSubsDuration({ duration: 5, subcDuraPrice: 10 * subsDuractionPlan[0].amount,subsType:subsDuractionPlan[0].subscription_type,subPlanId: subsDuractionPlan[0].id }))}

  },[subsDuractionPlan])
  
  {/*Remover empty object inside array*/}
  function isEmptyObj(arrObj) {
    return Object.keys(arrObj).length >= 1;
  }

console.log("subsDuractionPlan",subsDuractionPlan)
  return (
    <>
      <DialogContent style={{ width: "", borderRadius: "2px solid red" }}>
        {subsDuractionPlan.filter(isEmptyObj).length > 0 && (
          <span>
            <b>Duration:</b>
          </span>
        )}
        <DialogContentText id="alert-dialog-slide-description">
          <Grid
            container
            style={{ alignItems: "center", fontWeight: "bold", width: "440px" }}
          >
            {subsDuractionPlan.filter(isEmptyObj).length > 0 && (
              <>
                {Object.keys(subsDuractionPlan[0]).length >= 1 && (
                  <>
                    <Radio
                      checked={parseInt(selectedValue) === 1}
                      onChange={(e)=>handleChange(e,subsDuractionPlan[0].amount,subsDuractionPlan[0].subscription_type,subsDuractionPlan[0].id)}
                      value={subsDuractionPlan[0].subscription_type}
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "A" }}
                    />
                    One Day ({`${subsDuractionPlan[0].amount * 10} Points` })
                  </>
                )}
                {Object.keys(subsDuractionPlan[1]).length >= 1 && (
                  <>
                    <Radio
                      checked={parseInt(selectedValue) === 2}
                      onChange={(e)=>handleChange(e,subsDuractionPlan[1].amount,subsDuractionPlan[1].subscription_type,subsDuractionPlan[1].id)}
                      value={subsDuractionPlan[1].subscription_type}
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "B" }}
                    />
                    One Week ({`${subsDuractionPlan[1].amount * 10} Points` })
                  </>
                )}
                {Object.keys(subsDuractionPlan[2]).length >= 1 && (
                  <>
                    <Radio
                      checked={parseInt(selectedValue) === 3}
                      onChange={(e)=>handleChange(e,subsDuractionPlan[2].amount,subsDuractionPlan[2].subscription_type,subsDuractionPlan[2].id)}
                      value={subsDuractionPlan[2].subscription_type}
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "C" }}
                    />
                    One Month ({`${subsDuractionPlan[2].amount * 10} Points` })
                  </>
                )}
                {Object.keys(subsDuractionPlan[3]).length >= 1 && (
                  <>
                    <Radio
                      checked={parseInt(selectedValue) === 4}
                      onChange={(e)=>handleChange(e,subsDuractionPlan[3].amount,subsDuractionPlan[3].subscription_type,subsDuractionPlan[3].id)}
                      value={subsDuractionPlan[3].subscription_type}
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "D" }}
                    />
                    Six Month ({`${subsDuractionPlan[3].amount * 10} Points` })
                  </>
                )}
                {Object.keys(subsDuractionPlan[4]).length >= 1 && (
                  <>
                    <Radio
                      checked={parseInt(selectedValue) === 5}
                      onChange={(e)=>handleChange(e,subsDuractionPlan[4].amount,subsDuractionPlan[4].subscription_type,subsDuractionPlan[4].id)}
                      value={subsDuractionPlan[4].subscription_type}
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "E" }}
                    />
                    One Year ({`${subsDuractionPlan[4].amount * 10} Points` })
                  </>
                )}
              </>
            )}
          </Grid>
        </DialogContentText>
      </DialogContent>
    </>
  );
};
export default memo(SubscriptionDuration);
