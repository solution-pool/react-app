import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Login from "./components/userLogin/Login";
import SignUp from "./components/userSignUp/SignUp";
import DashBoard from "./components/dashboard/DashBoard";
import PostTabs from "./components/post/PostTabs";
import ViewPost from "./components/post/ViewPost";
import Home from "./components/Home";
import ImageSlider from "./components/slider/ImageSlider";
import Comment from "./components/comment/Comment";
import userProfile from "./components/userProfile/Profile";
import Drafts from "./components/post/draft/Drafts";
import LikePostsDisplay from "./components/post/likePost/likePostsDisplay";
import dotenv from "dotenv";
import { pushNotifications } from "./store/actions/pushNotifications";
import { useSelector, useDispatch } from "react-redux";
import AdminLogin from "./components/admin/AdminLogin";
import CreateGroup from "./components/userProfile/group/CreateGroup";
import BountyComment from "./components/bountyComment/BountyComment";
import PaymentGateway from './components/payment/PaymentGateway';
import AutoCreditCard from './components/payment/AutoCreditCard';
import payment_paypal from './components/payment/payment_paypal';
import PaymentProcessLoader from './components/loader/PaymentProcessLoader'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

dotenv.config();

const App = () => {
  const userSendFriendReque = useSelector(
    (state) => state.userSendFriendRequest
  );
  const dispatch = useDispatch();

  {
    /*Hit socket after sent friend or client request*/
  }
  useEffect(() => {
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "anyKey",
      cluster: "ap2",
      forceTLS: false,
      wsHost: window.location.hostname,
      wsPort: 6001,
    });

    window.Echo.channel("events").listen("RealTimeMessage", (e) => {
      dispatch(pushNotifications(JSON.parse(e.message)));
    });
  }, [userSendFriendReque]);

  // const createOrder = (data, actions) => {
  //   return actions.order.create({
  //     purchase_units: [
  //       {
  //         amount: {
  //           value: "0.01",
  //         },
  //       },
  //     ],
  //   });
  // };

  // const onApprove = (data, actions) => {
  //   return actions.order.capture();
  // };
  return (
    <React.Fragment>
      {/* <div className="wrapper">
        <PayPalButton
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </div> */}
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login/" component={Login}></Route>
          <Route exact path="/signup/" component={SignUp}></Route>
          <Route exact path="/dashboard" component={DashBoard}></Route>
          <Route exact path="/create-post" component={PostTabs}></Route>
          <Route exact path="/edit-post/:id" component={PostTabs}></Route>
          <Route exact path="/view-post" component={ViewPost}></Route>
          <Route exact path="/image-slider" component={ImageSlider}></Route>
          <Route exact path="/profile/:id" component={userProfile}></Route>
          <Route exact path="/comment" component={Comment}></Route>
          <Route exact path="/draft-post" component={Drafts}></Route>
          <Route
            exact
            path="/liked-post/:id"
            component={LikePostsDisplay}
          ></Route>
          <Route exact path="/admin" component={AdminLogin}></Route>
          <Route exact path="/create-group" component={CreateGroup}></Route>
          <Route exact path="/comment" component={Comment}></Route>
          <Route exact path="/payment" component={PaymentGateway}></Route>
          <Route exact path="/credit_card" component={AutoCreditCard}></Route>
          <Route exact path="/payment_paypal" component={payment_paypal}></Route>
          
          <Route exact path='/PaymentProcessLoader' component={PaymentProcessLoader}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
