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
  checkedAddTippPoint,
} from "../../store/actions/userAmt";
import PaymentOption from "./PaymentOption";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function AddTippPoints({}) {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [addPoint, setAddPoint] = useState([]);
  const dispatch = useDispatch();
  const userAmtReducer = useSelector((state) => state.userAmtReducer.userAmt);

  const handleChange = (value, tipptradePoint) => {
    dispatch(
      PurchaseTippTradePoint({ tippTradePoint: tipptradePoint, type: 1 })
    );
    dispatch(
      checkedAddTippPoint({ checkedAddTippPoints: tipptradePoint, type: 0 })
    );
    setSelectedValue(tipptradePoint);
    localStorage.setItem("add_tipptrade_point", value);
    setStatus(true);
  };

  useEffect(async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/gettriptadepointdollaramount",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status) {
        if(response.data.TriptadePointWithDollarAmount.length > 0){
          setAddPoint(response.data.TriptadePointWithDollarAmount);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  return (
    <>
      <DialogContent style={{ width: "", borderRadius: "2px solid red" }}>
        {addPoint.length > 0 && (
          <spna>
            <b>Add Point:</b>
          </spna>
        )}
        <DialogContentText id="alert-dialog-slide-description">
          <Grid
            container
            style={{ alignItems: "center", fontWeight: "bold", width: "460px" }}
          >
            {addPoint.length > 0 &&
              addPoint.map((points) => (
                <>
                  <Radio
                    checked={selectedValue === points.triptadeAmount}
                    onChange={(event) =>
                      handleChange(event.target.value, points.triptadeAmount)
                    }
                    value={points.triptadeAmount}
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "A" }}
                  />
                  {`${points.triptadeAmount}`} ({`$${points.dollarAmount}`})
                </>
              ))}
          </Grid>
        </DialogContentText>
      </DialogContent>
    </>
  );
}
