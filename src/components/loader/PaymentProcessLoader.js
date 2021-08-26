import { useState } from "react";
import { css } from "@emotion/react";
import {
  ClipLoader,
  BounceLoader,
  BarLoader,
  BeatLoader,
} from "react-spinners";
import "./../../App.css";
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const PaymentProcessLoader = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div id="loader_box">
      <div className="loader_div">
        <BeatLoader color={"red"} loading={loading} css={override} size={72} />
      </div>
    </div>
  );
};

export default PaymentProcessLoader;
