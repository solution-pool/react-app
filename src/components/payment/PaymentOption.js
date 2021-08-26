import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "../../App.css";
import { useSelector, useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const PaymentOption = () => {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event) => {
      
    setSelectedValue(event.target.value);
  };

  console.log("selectedValue",selectedValue);
  return (
    <React.Fragment>
      <div>
        {/* <Radio
          checked={selectedValue === "a"}
          onChange={handleChange}
          value="a"
          name="radio-button-demo"
          inputProps={{ "aria-label": "A" }}
        />
        Credit Card
        <Radio
          checked={selectedValue === "b"}
          onChange={handleChange}
          value="b"
          name="radio-button-demo"
          inputProps={{ "aria-label": "B" }}
        />
        Debit Card */}
        <GreenRadio
          checked={selectedValue === "c"}
          onChange={handleChange}
          value="c"
          name="radio-button-demo"
          inputProps={{ "aria-label": "C" }}
        />
        Stripe Payment Gateway
        <Radio
          checked={selectedValue === "d"}
          onChange={handleChange}
          value="d"
          color="default"
          name="radio-button-demo"
          inputProps={{ "aria-label": "D" }}
        />
        <Radio
          checked={selectedValue === "e"}
          onChange={handleChange}
          value="e"
          color="default"
          name="radio-button-demo"
          inputProps={{ "aria-label": "E" }}
          size="small"
        />
      </div>
    </React.Fragment>
  );
};

export default PaymentOption;
