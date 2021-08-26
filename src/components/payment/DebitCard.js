import React, { useEffect } from "react";
import ReactDOM from "react-dom";
// import "../../App.css";
import { useSelector, useDispatch } from "react-redux";

const DebitCard = () => {
  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };
  return (
    <React.Fragment>
      <div class="padding">
        <div class="row">
          <div class="container-fluid">
            <div class="col-sm-8 col-md-6">
              <div class="card">
                <div class="card-header">
                  <div class="row">
                    <div class="col-md-7">
                      <span>DEBIT CARD PAYMENT</span>
                    </div>
                    <div class="col-md-5 text-right" style={{marginTop: "-5px"}}>
                      {" "}
                      <img src="https://img.icons8.com/color/36/000000/visa.png" />{" "}
                      <img src="https://img.icons8.com/color/36/000000/mastercard.png" />{" "}
                      <img src="https://img.icons8.com/color/36/000000/amex.png" />{" "}
                    </div>
                  </div>
                </div>
                <div class="card-body" style={{"height": "350px"}}>
                  <div class="form-group">
                    {" "}
                    <label for="cc-number" class="control-label">
                      CARD NUMBER
                    </label>{" "}
                    <input
                      id="cc-number"
                      type="tel"
                      class="input-lg form-control cc-number"
                      autocomplete="cc-number"
                      placeholder="•••• •••• •••• ••••"
                      required
                    />{" "}
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        {" "}
                        <label for="cc-exp" class="control-label">
                          CARD EXPIRY
                        </label>{" "}
                        <input
                          id="cc-exp"
                          type="tel"
                          class="input-lg form-control cc-exp"
                          autocomplete="cc-exp"
                          placeholder="•• / ••"
                          required
                        />{" "}
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        {" "}
                        <label for="cc-cvc" class="control-label">
                          CARD CVC
                        </label>{" "}
                        <input
                          id="cc-cvc"
                          type="tel"
                          class="input-lg form-control cc-cvc"
                          autocomplete="off"
                          placeholder="••••"
                          required
                        />{" "}
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    {" "}
                    <label for="numeric" class="control-label">
                      CARD HOLDER NAME
                    </label>{" "}
                    <input type="text" class="input-lg form-control" />{" "}
                  </div>
                  <div class="form-group text-center">
                    {" "}
                    <input
                      value="Pay Now"
                      type="button"
                      class="btn btn-success btn-sm"
                      style={{fontSize: ".8rem"}}
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DebitCard;
