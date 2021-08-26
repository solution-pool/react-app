import React, { useEffect, useState } from "react";
import axios from "axios";
import Subscribers from './postSubscription/Subscribers';
import YourSubscriptions from './postSubscription/YourSubscriptions';


const SubscriptionPlan = () => {
  const [duraPrice, setDuraPrice] = useState({
    one_day: "",
    one_week: "",
    one_month: "",
    six_month: "",
    one_year: "",
  });

  const [subsPlanSuccMsg, setSubsPlanSuccMsg] = useState(0);
  const [subsDuractionPlan, setSubsDuraionPlan] = React.useState([]);

  const setDuractionWithPrice = (e) => {
    let name = e.target.name;
    let value = !isNaN(e.target.value) ? e.target.value : "";
    setDuraPrice({ ...duraPrice, [name]: value });
  };

  const subscriptionPlan = (e, modifyType) => {
    e.preventDefault();
    console.log("modifyType", modifyType, subsDuractionPlan);
    let subsDuraType = "";
    let subsDuraTime = "";
    let subDuraTimeWithType = [];
    const { one_day, one_week, one_month, six_month, one_year } = duraPrice;

    if (modifyType === 1) {
      if (one_day !== "") {
        subDuraTimeWithType.push({ subsPrice: one_day, subsDuraType: 1 });
      }
      if (one_week !== "") {
        subDuraTimeWithType.push({ subsPrice: one_week, subsDuraType: 2 });
      }
      if (one_month !== "") {
        subDuraTimeWithType.push({ subsPrice: one_month, subsDuraType: 3 });
      }
      if (six_month !== "") {
        subDuraTimeWithType.push({ subsPrice: six_month, subsDuraType: 4 });
      }
      if (one_year !== "") {
        subDuraTimeWithType.push({ subsPrice: one_year, subsDuraType: 5 });
      }
    }

    if (modifyType === 2) {
      console.log("duraPrice123", typeof one_day, one_day, subsDuractionPlan);
      if (one_day !== "" && typeof one_day === "string") {
        subDuraTimeWithType.push({ subsPrice: one_day, subsDuraType: 1 });
      }
      if (one_week !== "" && typeof one_week === "string") {
        subDuraTimeWithType.push({ subsPrice: one_week, subsDuraType: 2 });
      }
      if (one_month !== "" && typeof one_month === "string") {
        subDuraTimeWithType.push({ subsPrice: one_month, subsDuraType: 3 });
      }
      if (six_month !== "" && typeof six_month === "string") {
        subDuraTimeWithType.push({ subsPrice: six_month, subsDuraType: 4 });
      }
      if (one_year !== "" && typeof one_year === "string") {
        subDuraTimeWithType.push({ subsPrice: one_year, subsDuraType: 5 });
      }
    }

    axios
      .post(
        process.env.REACT_APP_API_URL + "/insertSubsPlanAllUsers",
        {
          user_id: localStorage.getItem("userId"),
          subscription_type: subDuraTimeWithType,
          type: subsDuractionPlan.length > 0 ? 2 : 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status) {
          setDuraPrice({
            one_day: "",
            one_week: "",
            one_month: "",
            six_month: "",
            one_year: "",
          });

          setSubsPlanSuccMsg(modifyType);
        }
        console.log("detailShow", response);

        //   history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error.message);
      });

    // alert("sumit");
  };

  useEffect(() => {
    axios
      .post(process.env.REACT_APP_API_URL + `/getSubsPlanDataByUserId`, {
        user_id: localStorage.getItem("userId"),
      })
      .then((response) => {
        //JSON.parse()
        if (response.data.status && response.data.Data.length > 0) {
          console.log("maheshRep", response.data.Data);
          setSubsDuraionPlan(response.data.Data);
          setTimeout(() => {
            setSubsPlanSuccMsg(0);
          }, 3000);

          if (response.data.Data[0].subscription_type == 1) {
            setDuraPrice({ one_day: response.data.Data[0].amount });
          }
          if (response.data.Data[1].subscription_type == 2) {
            setDuraPrice({ one_week: response.data.Data[1].amount });
          }
          if (response.data.Data[2].subscription_type == 3) {
            setDuraPrice({ one_month: response.data.Data[2].amount });
          }
          if (response.data.Data[3].subscription_type == 4) {
            setDuraPrice({ six_month: response.data.Data[3].amount });
          }
          if (response.data.Data[4].subscription_type == 5) {
            setDuraPrice({ one_year: response.data.Data[4].amount });
          }
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [subsPlanSuccMsg]);

  console.log("duraPrice", subsDuractionPlan, duraPrice);

  function isEmptyObj(arrObj) {
    return Object.keys(arrObj).length >= 1;
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="row ">
          <div className="col-md-12 ">
            <form
              onSubmit={(e) =>
                subscriptionPlan(
                  e,
                  subsDuractionPlan.filter(isEmptyObj).length > 0 ? 2 : 1
                )
              }
            >
              <div className="row mb-2 d-flex">
                {/* <div className="col-md-2 "> */}
                <div
                  // class="bg-warning p-2 mr-3"
                  // style={{ display: "inline-block", height: "40px" }}
                  class="p-2 bg-warning price_text"

                >
                  Price
                </div>

                <div className="sub_plan_box">
                  <input
                    type="text"
                    class="form-control"
                    id="one_day"
                    placeholder="Enter Price"
                    name="one_day"
                    value={duraPrice.one_day}
                    onChange={(e) => setDuractionWithPrice(e)}
                  />
                </div>
                <div className="sub_plan_box">
                  <input
                    type="text"
                    class="form-control"
                    id="one_week"
                    placeholder="Enter Price"
                    name="one_week"
                    value={duraPrice.one_week}
                    onChange={(e) => setDuractionWithPrice(e)}
                  />
                </div>
                <div className="sub_plan_box">
                  <input
                    type="text"
                    class="form-control"
                    id="one_month"
                    placeholder="Enter Price"
                    name="one_month"
                    value={duraPrice.one_month}
                    onChange={(e) => setDuractionWithPrice(e)}
                  />
                </div>
                <div className="sub_plan_box">
                  <input
                    type="text"
                    class="form-control"
                    id="six_month"
                    placeholder="Enter Price"
                    name="six_month"
                    value={duraPrice.six_month}
                    onChange={(e) => setDuractionWithPrice(e)}
                  />
                </div>
                <div className="sub_plan_box">
                  <input
                    type="text"
                    class="form-control"
                    id="one_year"
                    placeholder="Enter Price"
                    name="one_year"
                    value={duraPrice.one_year}
                    onChange={(e) => setDuractionWithPrice(e)}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    class="btn btn-primary save_btn_sub_plan"
                    disabled={
                      duraPrice.one_day === "" &&
                      duraPrice.one_week === "" &&
                      duraPrice.one_month === "" &&
                      duraPrice.six_month === "" &&
                      duraPrice.one_year === ""
                        ? "disabled"
                        : ""
                    }
                  >
                    {subsDuractionPlan.filter(isEmptyObj).length > 0
                      ? "Update"
                      : "Save"}
                  </button>
                </div>
              </div>
            </form>

            <div className="row">
              <div className="col-md-12 ">
                <div className="mb-2 d-flex">
                  <div
                    class="p-2 bg-warning duration_text"
                    // style={{ display: "inline-block" }}
                  >
                    Duration
                  </div>
                  <div  className="sub_plan_price">One Day</div>
                  <div className="sub_plan_price1">One Week</div>
                  <div className="sub_plan_price2">One Month</div>
                  <div className="sub_plan_price3">Six Month</div>
                  <div className="sub_plan_price4">One Year</div>
                </div>
              </div>
            </div>
            {/* <div class="p-2 bg-info">Tipptrade charges wil be 5%</div> */}
          </div>
          {subsPlanSuccMsg === 1 && (
          <div
          className="row d-flex justify-content-center"
          // style={{ width: "361px" }}
          >
            <span className="plan_msg" >
              {" "}
              Subscription plan has been successfully created.
            </span>
          </div>
        )}
        {subsPlanSuccMsg === 2 && (
          <div
            className=" row d-flex justify-content-center"
            // style={{ width: "368px" }}
          >
            <span className="plan_msg" >
              {" "}
              Subscription plan has been successfully updated.
            </span>
          </div>
         )} 

        </div>
      </div>
      <Subscribers />
      <YourSubscriptions />
      </React.Fragment>
  );
};

export default SubscriptionPlan;
