import React, { memo, useState} from "react";
import {advancePostShareSetting} from "../../store/actions/advancePostShareSetting";
import { useSelector, useDispatch } from "react-redux";

const AdvanceSharePostSettingModal = ({ opens }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [advanceSettingVal,setAdvSettingVal] = useState({
        like:'',
        paid:'',
        collab:''
    });

    const setAdvanceStting = (e)=>{
        const {name,value} = e.target;
        console.log("name123",name)
        if(name !== "collab"){
          setAdvSettingVal({...advanceSettingVal,[name]:!isNaN(value) ? value <= 100 ? value : "" : ""})

        }else{
          setAdvSettingVal({...advanceSettingVal,[name]:!isNaN(value) ? value <= 50 ? value : "" : ""})

        }
    }

    const CleareModalVal = ()=>{
        // setAdvSettingVal({
        //     like:'',
        //     paid:'',
        //     collab:''
        // })
        dispatch(advancePostShareSetting(advanceSettingVal))
    }

  return (
    <>
      <button
        type="button"
        class="btn btn-primary mb-2"
        data-toggle="modal"
        data-target="#exampleModal"
        data-whatever="@mdo"
      >
        Advance
      </button>
      {/* <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        data-whatever="@fat"
      >
        Open modal for @fat
      </button>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        data-whatever="@getbootstrap"
      >
        Open modal for @getbootstrap
      </button> */}

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content" style={{ minWidth: "616px" }}>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Advance share post setting
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {/* <form>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Like:
                  </label>
                  <input type="text" class="form-control" id="recipient-name" />
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Paid:
                  </label>
                  <input type="text" class="form-control" id="recipient-name" />
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Collab:
                  </label>
                  <input type="text" class="form-control" id="recipient-name" />
                </div>
              </form> */}
              <div class="container">
                <form class="form-inline" action="/action_page.php">
                  {/* <label for="email2" class="mb-2 mr-sm-2">
                    Email:
                  </label>
                  <input
                    type="text"
                    class="form-control mb-2 mr-sm-2"
                    id="email2"
                    placeholder="Enter email"
                    name="email"
                  />
                  <label for="pwd2" class="mb-2 mr-sm-2">
                    Password:
                  </label>
                  <input
                    type="text"
                    class="form-control mb-2 mr-sm-2"
                    id="pwd2"
                    placeholder="Enter password"
                    name="pswd"
                  /> */}
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">
                      Like%: 
                    </label>
                    <input
                      type="text"
                      class="advace-setting"
                      id="recipient-name"
                      style={{
                        width: "91px",
                        marginRight: "10px",
                        marginLeft: "5px",
                      }}
                      name="like"
                      onChange={setAdvanceStting}
                      value={advanceSettingVal.like}
                      autoComplete="off"
                    />
                  </div>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">
                      Paid%:
                    </label>
                    <input
                      type="text"
                      class="advace-setting"
                      id="recipient-name"
                      style={{
                        width: "91px",
                        marginRight: "10px",
                        marginLeft: "5px",
                      }}
                      name="paid"
                      onChange={setAdvanceStting}
                      value={advanceSettingVal.paid}
                      autoComplete="off"
                    />
                  </div>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">
                      Collab%:
                    </label>
                    <input
                      type="text"
                      class="advace-setting"
                      id="recipient-name"
                      style={{
                        width: "91px",
                        marginRight: "10px",
                        marginLeft: "5px",
                      }}
                      name="collab"
                      onChange={setAdvanceStting}
                      value={advanceSettingVal.collab}
                      autoComplete="off"
                    />
                  </div>

                  {/* <div class="form-check mb-2 mr-sm-2">
      <label class="form-check-label">
        <input type="checkbox" class="form-check-input" name="remember"> Remember me
      </label>
    </div>     */}
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    onClick={CleareModalVal}

                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              {/* <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" class="btn btn-primary">
                Save
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(AdvanceSharePostSettingModal);
