import React, { useEffect,useState } from "react";
import ReactDOM from "react-dom";
import "../../App.css";
import { useSelector, useDispatch } from "react-redux";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Route } from "react-router";

const CreditCard = () => {
  // const[cvc,setCvc] = useState('');
  // const[expiry,setExpiry] = useState('');
  // const[focus,setFocus] = useState('');
  // const[name,setName] = useState('');
  // const[number,setNumber] = useState('');
  const[cartOption,setCardOption]= useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });

  const setCardOptions = (e)=>{
    const { name, value } = e.target;
    const {cvc,expiry,focus,number} = cartOption;
    console.log("demoDetail",name,value);
    setCardOption({[name]:value})
  }
  console.log("cartOption",cartOption.cvc);
  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };
  return (
    <React.Fragment>
      <div class="padding">
        <div class="row">
          <div class="col-sm-6">
          <Cards
          cvc={cartOption.cvc}
          expiry={cartOption.expiry}
          focused={cartOption.focus}
          name={cartOption.name}
          number={cartOption.number}
        />
        </div>
        <div class="col-sm-6">
            <div class="card">
              <div class="card-header">
              <div class="row">
              <div class="col-sm-6">
                <strong>Credit Card</strong>
                </div>

                <div class="col-sm-6">                
                <img src="https://img.icons8.com/color/36/000000/visa.png" />{" "}
                <img src="https://img.icons8.com/color/36/000000/mastercard.png" />{" "}
                <img src="https://img.icons8.com/color/36/000000/amex.png" />{" "}
                </div>
                </div>
                {/* <small>enter your card details</small> */}
              </div>
             
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input
                        class="form-control"
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label for="ccnumber">Credit Card Number</label>
                      <div class="input-group">
                        <input
                          class="form-control"
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          autocomplete="Credit Card"
                          onChange={(e)=>setCardOptions(e)}
                          name='number'
                        />
                        <div class="input-group-append">
                          <span class="input-group-text">
                            <i class="mdi mdi-credit-card"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-sm-4">
                    <label for="ccmonth">Month</label>
                    <select class="form-control" id="ccmonth">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                    </select>
                  </div>
                  <div class="form-group col-sm-4">
                    <label for="ccyear">Year</label>
                    <select class="form-control" id="ccyear">
                      <option>2014</option>
                      <option>2015</option>
                      <option>2016</option>
                      <option>2017</option>
                      <option>2018</option>
                      <option>2019</option>
                      <option>2020</option>
                      <option>2021</option>
                      <option>2022</option>
                      <option>2023</option>
                      <option>2024</option>
                      <option>2025</option>
                    </select>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label for="cvv">CVV/CVC</label>
                      <input
                        class="form-control"
                        id="cvv"
                        type="text"
                        placeholder="123"
                        onChange={(e)=>setCardOptions(e)}
                        name="cvc"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer text-center">
                <button
                  class="btn btn-success"
                  type="submit"
                >
                  <i class="mdi mdi-gamepad-circle"></i> Pay Now
                </button>
                {/* <button class="btn btn-sm btn-danger" type="reset">
                  <i class="mdi mdi-lock-reset"></i> Reset
                </button> */}
              </div>
              {/* <div class="text-center">
      <button type="button" class="btn btn-primary">Centered button</button>
    </div> */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreditCard;
