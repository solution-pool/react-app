import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../App.css";
import { useSelector, useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import PaymentProcessLoader from "../loader/PaymentProcessLoader";
import {getUserAmtDetail,openPayTypeSelectModal} from "../../store/actions/userAmt";
import { useHistory } from "react-router-dom";

const StripePaymentGateway = () => {
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(false);
  const history = useHistory();

  const postPrice = useSelector((state) => state.userAmtReducer.postPrice);
  const userPostDetails = useSelector(
    (state) => state.userAmtReducer.userSubscPostDetails
  );
  const userPurchaseTippPoint = useSelector((state) => state.userAmtReducer.userPurchaseTippPoint);
  const userSubscPostDuraWithPrice = useSelector((state) => state.userAmtReducer.userSubscPostDuraWithPrice);

  console.log("userSubscPostDetails123", userPostDetails);

  const onToken = async (token) => {
    setLoading(true);
    localStorage.removeItem('paymentMode');

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/addPayment",
        {
          user_id: localStorage.getItem("userId"),
          amount: userPurchaseTippPoint.tippTradePoint !== '' ? userPurchaseTippPoint.tippTradePoint/10 
          :userPurchaseTippPoint.tippTradePoint === '' && userSubscPostDuraWithPrice.subcDuraPrice !== '' && userPostDetails.postAmt === 0 ? userSubscPostDuraWithPrice.subcDuraPrice/10 
          : userPostDetails.postAmt !== 0 ? userPostDetails.postAmt  : '',
          token: token.id,
          card_id: token.card.id,
          card_brand: token.card.brand,
          country: token.card.country,
          exp_month: token.card.exp_month,
          exp_year: token.card.exp_year,
          funding: token.card.funding,
          card_last_digit: token.card.last4,
          user_name: token.card.name,
          client_ip: token.client_ip,
          created_at: token.created,
          user_email: token.email,
          type: token.type,
          payment_type: 1,
          payment_status: "success",
          currency: "USD",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    
      if (response.status === 201) {
        
        setLoading(true);
      
        if(userPurchaseTippPoint.tippTradePoint !== '' && userPurchaseTippPoint.type === 1){
          addtriptadepointsub();
        }else{
         
         userPostDetails.post_type === 6 ?  oneTimeSubscri() : getSubsciption("success")
        }
                //   getSubsciption("success");

      }

      console.log("backendResponse", response);
    } catch (error) {
      console.log("error", error.response);
    }
  };

  const addtriptadepointsub = ()=>{
    setLoading(true);
    axios
      .post(
        process.env.REACT_APP_API_URL + `/addtriptadepointsubs`,
        {
          user_id: localStorage.getItem('userId'),
          tipp_trade_point_sub : userPurchaseTippPoint.tippTradePoint,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        dispatch(openPayTypeSelectModal(true))
        dispatch(getUserAmtDetail())
        history.push('/');
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const getSubsciption = (payment_status) => {
    setLoading(true);
    axios
      .post(
        process.env.REACT_APP_API_URL + `/savesubpost`,
        {
          user_id: localStorage.getItem("userId"),
          post_id: userPostDetails.post_id,
          post_type: userPostDetails.post_type,
          post_amount_type: 1,
          post_user_id: userPostDetails.post_user_id,
          post_amount: userPurchaseTippPoint.tippTradePoint !== '' ? userPurchaseTippPoint.tippTradePoint/10 
          :userPurchaseTippPoint.tippTradePoint === '' && userSubscPostDuraWithPrice.subcDuraPrice !== '' && userPostDetails.postAmt === 0 ? userSubscPostDuraWithPrice.subcDuraPrice/10 
          : userPostDetails.postAmt !== 0 ? userPostDetails.postAmt  : '',
          // payment_status: payment_status,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        history.push("/");
        /*Call function and get one time subscrition*/
        // oneTimeSubscri();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  /*Get one time subscription*/
  const oneTimeSubscri = ()=>{
   
    axios
    .post(
      process.env.REACT_APP_API_URL + `/insertonetimesubscription`,
      {
        user_id: userPostDetails.user_id,
        post_user_id : userPostDetails.post_user_id,
        subs_plan_user_id : userPostDetails.post_user_id,
        subs_plan_type : userPurchaseTippPoint.subsType !== '' ? userPurchaseTippPoint.subsType : ''
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(response => {
      // console.log("response123",response);
      setLoading(false);
      history.push('/');
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  return (
    <React.Fragment>
      {loading ? (
        <PaymentProcessLoader />
      ) : (
        <div className="wrapper-top" >
          <div className="wrapper" style={{display: loading ? 'none' : 'block'}}>
            <StripeCheckout
              token={onToken}
              panelLabel="Pay" // prepended to the amount in the bottom pay button
              amount={userPostDetails.postAmt} // cents
              currency="USD"
              stripeKey="pk_test_51IdY9ISEXGqhsIRiy5uV5M1lUr53JTJBNJsF5tnlcP69RDukPEUtDwkUOJN8bB6Sk2K92xC2d76f5IKXQMpCi1AB00jGoPcODf"
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default StripePaymentGateway;
