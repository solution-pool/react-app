import React, { useEffect,useState } from "react";
import Button from "@material-ui/core/Button";
import ReactDOM from "react-dom";
import "../../App.css";
import { useSelector, useDispatch } from "react-redux";
import StripePaymentGateway from "./StripePaymentGateway";
// import CreditCard from "./AutoCreditCard";
import DebitCard from "./DebitCard";
// import SupportedDebitCards from './creditCard/Cards'
import CreditCardFrom from "./creditCard/CreditCardFrom";
import DebitCardFrom from "./debitCard/DebitCardFrom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import PaymentProcessLoader from "../loader/PaymentProcessLoader";
import { getUserAmtDetail,openPayTypeSelectModal } from "../../store/actions/userAmt";


const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const PaymentGateway = () => {
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(false);
  const postPrice = useSelector((state) => state.userAmtReducer.postPrice);
  const history  = useHistory();
  const userPostDetails = useSelector(
    (state) => state.userAmtReducer.userSubscPostDetails
  );
  const userPurchaseTippPoint = useSelector((state) => state.userAmtReducer.userPurchaseTippPoint);
  const userSubscPostDuraWithPrice = useSelector((state) => state.userAmtReducer.userSubscPostDuraWithPrice);

  console.log("checkTipp",userPostDetails)


  console.log("postPrice", postPrice);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: userPurchaseTippPoint.tippTradePoint !== '' ? userPurchaseTippPoint.tippTradePoint/10 
            :userPurchaseTippPoint.tippTradePoint === '' && userSubscPostDuraWithPrice.subcDuraPrice !== '' && userPostDetails.postAmt === 0 ? userSubscPostDuraWithPrice.subcDuraPrice/10 
            : userPostDetails.postAmt !== 0 ? userPostDetails.postAmt  : ''
          },
        },
      ],
    });
  };

  /*Payment approve*/
  const onApprove = async (data, actions) => {
    setLoading(true);
    try{
      const response = await axios.post(process.env.REACT_APP_API_URL + "/addPayment", {
   
          user_id:localStorage.getItem('userId'),
          order_id:data.orderID,
          payer_id : data.payerID,
          payment_id : data.paymentID,
          billing_token : data.billingToken,
          facilitator_access_token : data.facilitatorAccessToken,
          payment_status : null,
          payment_type : 2,
          amount : userPurchaseTippPoint.tippTradePoint !== '' ? userPurchaseTippPoint.tippTradePoint/10 
          :userPurchaseTippPoint.tippTradePoint === '' && userSubscPostDuraWithPrice.subcDuraPrice !== '' && userPostDetails.postAmt === 0 ? userSubscPostDuraWithPrice.subcDuraPrice/10 
          : userPostDetails.postAmt !== 0 ? userPostDetails.postAmt  : '',
          payment_status: 'success'
      },{
        headers: {
          "Content-Type": "application/json",
        },
      })
      if(response.status === 201){
        setLoading(true);
        if(userPurchaseTippPoint.tippTradePoint !== '' && userPurchaseTippPoint.type === 1){
          addtriptadepointsub();
        }else{
          userPostDetails.post_type === 6 ?  oneTimeSubscri() : getSubsciption()
        }
      }
    }catch(error){
        console.log("error",error)
    }
    return actions.order.capture();
  };

  const addtriptadepointsub = ()=>{
    setLoading(true);
    axios
      .post(
        process.env.REACT_APP_API_URL + `/addtriptadepointsubs`,
        {
          user_id: localStorage.getItem('userId'),
          tipp_trade_point_sub: userPurchaseTippPoint.tippTradePoint,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        if(userPurchaseTippPoint.tippTradePoint !== '' && userPurchaseTippPoint.type === 1){

        dispatch(openPayTypeSelectModal(true))
        }
        dispatch(getUserAmtDetail())
        history.push('/');
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const getSubsciption = ()=>{
    axios
      .post(
        process.env.REACT_APP_API_URL + `/savesubpost`,
        {
          user_id: userPostDetails.user_id,
          post_id: userPostDetails.post_id,
          post_type: userPostDetails.post_type,
          post_amount_type : 1,
          post_user_id : userPostDetails.post_user_id,
          post_amount : userPurchaseTippPoint.tippTradePoint !== '' ? userPurchaseTippPoint.tippTradePoint/10 
          :userPurchaseTippPoint.tippTradePoint === '' && userSubscPostDuraWithPrice.subcDuraPrice !== '' && userPostDetails.postAmt === 0 ? userSubscPostDuraWithPrice.subcDuraPrice/10 
          : userPostDetails.postAmt !== 0 ? userPostDetails.postAmt  : '',
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if(response.data.status){
          // oneTimeSubscri();
          setLoading(false);
          history.push('/');
        }
        
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const oneTimeSubscri = ()=>{
   
    axios
    .post(
      process.env.REACT_APP_API_URL + `/insertonetimesubscription`,
      {
        user_id: userPostDetails.user_id,
        post_user_id : userPostDetails.post_user_id,
        subs_plan_user_id : userPostDetails.post_user_id,
        subs_plan_type : userPurchaseTippPoint.subsType !== '' ? userPurchaseTippPoint.subsType : '',
        suscription_plan_id : userPurchaseTippPoint.subPlanId !== '' ? userPurchaseTippPoint.subPlanId : ''
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(response => {
      console.log("response123",response);
      setLoading(false);
      history.push('/');
    })
    .catch((error) => {
      console.log(error.message);
    });
  }
  console.log("tippTradePoint", userPurchaseTippPoint.tippTradePoint);
  return (
    <React.Fragment>
      {localStorage.getItem("paymentMode") === "b" && <CreditCardFrom />}
      {localStorage.getItem("paymentMode") === "c" && <DebitCardFrom />}

      {localStorage.getItem("paymentMode") === "d" && (
        // <div className="wrapper-top">
        //   <div className="wrapper">
        <StripePaymentGateway />
        //   </div>
        // </div>
      )}
      {localStorage.getItem("paymentMode") === "e" && (
      loading ? 
        <PaymentProcessLoader />
        :
      <div className="wrapper-top">
          <div className="wrapper" style={{display: loading ? 'none' : 'block'}}>
            <PayPalButton
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={(data, actions) => onApprove(data, actions)}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default PaymentGateway;
