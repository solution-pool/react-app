import React, { useState, useRef, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLoginSuccess } from "../../store/actions/login";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import LoginWithGoogle from "./../socialMediaLogin/loginWithGoogle";
import LoginWithFacebook from "./../socialMediaLogin/loginWithFacebook";
import LoginWithInstagram from "./../socialMediaLogin/loginWithInstagram";
import LoginWithTwitter from "./../socialMediaLogin/loginWithTwitter";
import Header from './../header/Header';
import loginImg from './../../images/pexels-photo.jpg'

const Login = () => {
  const dispatch = useDispatch();
  const [loginMsg, setLoginMsg] = useState(0);
  const [loginError, setLoginError] = useState(0);

  const history = useHistory();
  const formData = useRef(null);

  const [validate, setValidate] = useState({
    email: null,
    password: null,
    errors: {
      email: "",
      password: "",
    },
  });

  {/*Check user login or not then redirect*/}
  useEffect(() => {
    console.log("login");
    if (localStorage.getItem("emailId") === null) {
      history.push("/login");
    } else {
      history.push("/dashboard");
    }
  }, [localStorage.getItem("emailId")]);

  {/*After fill detail then user login*/}
  const formSubmit = (e) => {
    e.preventDefault();

    const [email, password] = formData.current;

    if (validateForm(validate.errors)) {
      console.info("Valid Form");
    } else {
      console.error("Invalid Form");
    }

    axios.post(
      process.env.REACT_APP_API_URL + "/login",
      {
        email: email.value,
        password: password.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        setLoginMsg(response.status);
        dispatch(userLoginSuccess(email.value));
        localStorage.setItem("emailId", email.value);

        setLoginError(0);
        email.value = '';
        password.value = '';
        history.push('/dashboard');
      })
      .catch((error) => {
        setLoginError(400);
        setLoginMsg(0);
      });

  };

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = validate.errors;
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


    switch (name) {
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case "password":
        errors.password = value.length < 1 ? "Enter your password!" : "";
        break;
      default:
        break;
    }

    setValidate({ errors, [name]: value }, () => {
      console.log(errors);
    });
  };

  const emailError = validate.errors.email.length > 0 ? 'red' : '';
  const passError = validate.errors.password.length > 0 ? 'red' : '';


  return (
    <>
      <Header />
      <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto themeBg">
        <div className="card card0 border-0 themeBg">
          {/* <div class="row">
            <div class="col-md-12">
            <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#home">Home</a></li>
                <li><a data-toggle="tab" href="#menu1">Menu 1</a></li> 
              </ul>

              <div class="tab-content">
                <div id="home" class="tab-pane fade in active show">
                  <h3>HOME</h3>
                  <p>Some content.</p>
                </div>
                <div id="menu1" class="tab-pane fade">
                  <h3>Menu 1</h3>
                  <p>Some content in menu 1.</p>
                </div> 
              </div>
            </div>
          </div> */}
          <div className="row">
            <div className="col-lg-6">
              <div className="card1 pb-5">
                <div className="row">
                  {" "}
                </div>
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line" >
                  {" "}
                  <img
                    src={loginImg}
                    alt="placeholder image" class="img-fluid"
                  />{" "}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card2 card border-0 px-4 py-5">
                <div className="row mb-4 px-3">
                  <br />
                  <div className="form-group col-lg-12 mx-auto">
                    <h6 className="mb-0 mr-4 mt-2">Login</h6>
                    <p>
                      LoginBy continuing, you agree to our User Agreement and
                      Privacy Policy.
                    </p>
                    <LoginWithFacebook />
                    <LoginWithGoogle />
                    <LoginWithInstagram />
                    <LoginWithTwitter />
                  </div>
                </div>
                <div className="row px-3 mb-4">
                  <div className="line"></div>{" "}
                  <small className="or text-center">Or</small>
                  <div className="line"></div>
                </div>
                {loginMsg == '200' ?
                  <h3 style={{ color: 'green', textAlign: 'center' }}>
                    Login successfully.
                    </h3> : ''
                }
                {loginError == '400' ?
                  <p style={{ color: 'red', textAlign: 'center' }}>
                    Incorrect username or password.
                  </p> : ''
                }
                <form name="form" onSubmit={formSubmit} ref={formData}>
                  <div className="row px-3">
                    {" "}
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Email</h6>
                    </label>{" "}
                    <input
                      type="text"
                      name="email"
                      onChange={(e) => handleChange(e)}
                      placeholder="Email Address"
                      style={{ borderColor: emailError }}
                      className="loginInp"
                    />

                  </div>
                  <div className="row px-3">
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Password</h6>
                    </label>{" "}
                    <input
                      type="password"
                      name="password"
                      onChange={(e) => handleChange(e)}
                      placeholder="Enter password"
                      style={{ borderColor: passError }}
                      className="loginInp"
                    />

                  </div>
                  <div className="row px-3 mb-4">
                    <div className="custom-control custom-checkbox custom-control-inline">
                      {" "}
                      <input
                        id="chk1"
                        type="checkbox"
                        name="chk"
                        class="custom-control-input"
                      />{" "}
                      <label
                        htmlFor="chk1"
                        class="custom-control-label text-sm"
                      >
                        Remember me
                      </label>{" "}
                    </div>{" "}
                    <a href="#" class="ml-auto mb-0 text-sm">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="row mb-3 px-3">
                    {" "}
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary text-center"
                    />{" "}
                  </div>
                  <div className="row mb-4 px-3">
                    {" "}
                    <small className="font-weight-bold">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="btn btn-link text-primary"
                        style={{
                          fontWeight: "700!important",
                          color: "#dc3545!important",
                        }}
                      >
                        Register
                      </Link>
                    </small>{" "}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="bg-blue py-4">
            <div className="row px-3">
              {" "}
              <small className="ml-4 ml-sm-5 mb-2">
                Copyright &copy; 2019. All rights reserved.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Login);
