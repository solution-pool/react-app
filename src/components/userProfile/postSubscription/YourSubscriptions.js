import React, { useEffect, useState } from "react";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import { subsDuraType } from "../../../../src/utility";

const YourSubscriptions = () => {
  const [allSubscr, setAllSubscr] = useState([]);

  {
    /*Get all login user subscription*/
  }
  useEffect(async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/getMySubsPlan",
        {
          user_id: localStorage.getItem("userId"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status) {
        if (response.data.Data.length > 0) {
          setAllSubscr(response.data.Data);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  console.log("responseDetails", allSubscr);

  return (
    <React.Fragment>
      <div class="container" style={{ marginTop: "53px" }}>
        <div className="row responsive-table">
          {/* <h2>Subscribers</h2> */}
          <h6>Your Subscriptions</h6>
          <table class="table table-bordered tab custom_table">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Subscription start date</th>
                <th>Subscription expiry date</th>
                <th>Subscription duration</th>
              </tr>
            </thead>
            <tbody>
              {allSubscr.length > 0 &&
                allSubscr.map((subsPlanDetails) => (
                  <tr>
                    <td>{subsPlanDetails.firstname}</td>
                    <td>{subsPlanDetails.lastname}</td>
                    <td>
                      {/* <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck1"
                        />
                        <label class="custom-control-label" for="customCheck1">
                        </label>
                      </div> */}
                      {subsPlanDetails.email}
                    </td>
                    <td>
                    {/* <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck2"
                        />
                        <label class="custom-control-label" for="customCheck2">
                        </label>
                      </div> */}
                      {'7668702045'}
                      </td>
                    <td>{subsPlanDetails.created_at}</td>
                    <td>{subsPlanDetails.post_subscription_expiry_date}</td>
                    <td>{subsDuraType(subsPlanDetails.subs_plan_type)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {allSubscr.length === 0 && (
          <div style={{ textAlign: "center" }}>Subscription Not Found</div>
        )}
      </div>
    </React.Fragment>
  );
};

export default YourSubscriptions;
