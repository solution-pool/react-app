import axios from "axios";
import React, {useEffect} from 'react'

export default function PaypalComponent() {
    useEffect(()=> {
        window.paypal.Button.render({
            env: 'sandbox', // Or 'production'
            // Set up the payment:
            // 1. Add a payment callback
            payment: function(data, actions) {
              // 2. Make a request to your server
              return actions.request.post('http://localhost:8000/create-payment')
                .then(function(res) {
                  // 3. Return res.id from the response
                  return res.id;
                });
            },
            // Execute the payment:
            // 1. Add an onAuthorize callback
            onAuthorize: function(data, actions) {
              // 2. Make a request to your server
              return actions.request.post('http://localhost:8000/execute-payment', {
                paymentID: data.paymentID,
                payerID:   data.payerID
              })
                .then(function(res) {
                  // 3. Show the buyer a confirmation message.
                  alert("payment got successful");
                });
            }
          }, '#paypal-button');
    }, []);
    return (
        <div>
            <h1>Paypal integration</h1>
            <div id="paypal-button"></div>

        </div>
    )
}

// const LikePostsDisplay = () => {


//   {
    /*Get login user liked post*/
  //}
//   useEffect(() => {
    // console.log(otherUserId);
    // if (
    //   otherUserId != "undefined" &&
    //   otherUserId == localStorage.getItem("userId")
    // ) {
    //   axios.post(
    //     PAYPAL_API + "/v1/payments/payment",
    //     {
    //       auth: {
    //         user: CLIENT,
    //         pass: SECRET,
            
    //       },
    //       body: 
    //       json: true,
    //     },
    //     function (err, response) {
    //       if (err) {
    //         console.error(err);
    //         return res.sendStatus(500);
    //       } else {
    //         console.log("response >>>", response.body);
    //       }
    //       // 3. Return the payment ID to the client
    //       // res.json(
    //       // {
    //       //     id: response.body.id
    //       // });
    //     }
    //   );
    //   axios
    //     .get(
    //       process.env.REACT_APP_API_URL + `/getLoginUserLikePost/${otherUserId}`
    //     )
    //     .then((response) => {
    //       setStorePostData(response.data.likePostList);

    //       if (response.data.likePostList.length === 0) {
    //         setLoaderStatus(false);
    //       } else {
    //         setLoaderStatus(false);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //     });
    // }

    // {
    //   /*Get login user name*/
    // }
//     axios
//       .get(
//         process.env.REACT_APP_API_URL +
//           "/getUser/" +
//           localStorage.getItem("emailId")
//       )
//       .then((response) => {
//         setUsername(response.data.User.username);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [otherUserId]);



// export default LikePostsDisplay;
// request.post(
//   PAYPAL_API + "/v1/payments/payment",
//   {
//     auth: {
//       user: CLIENT,
//       pass: SECRET,
//     },
//     body: {
//       intent: "sale",
//       payer: {
//         payment_method: "paypal",
//       },
//       transactions: [
//         {
//           amount: {
//             total: "5.99",
//             currency: "USD",
//           },
//         },
//       ],
//       redirect_urls: {
//         return_url: "http://127.0.0.1:3007/",
//         cancel_url: "http://127.0.0.1:3007/",
//       },
//     },
//     json: true,
//   },
//   function (err, response) {
//     if (err) {
//       console.error(err);
//       return res.sendStatus(500);
//     } else {
//       console.log("response >>>", response.body);
//     }
    // 3. Return the payment ID to the client
    // res.json(
    // {
    //     id: response.body.id
    // });
//   }
// );
//}
