import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import FormData from 'form-data';
import { useHistory } from "react-router-dom";
import Header from './../header/Header';
import registerImg from './../../images/register.svg'



import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


const SignUp = () => {
    const signupReducer = useSelector(state => state.signupReducer);
    const dispatch = useDispatch();
    // console.log(signupReducer);
    // const[userameError,setValidate] = useState({});
    const [signUpMsg, setSignUpMsg] = useState(0);
    const [uniqEmailMsg, setUniqEmailMsg] = useState(0);
    const [allFieldError, setAllFieldError] = useState('');
    const history = useHistory();



    useEffect(() => {
        console.log("login");
        if (localStorage.getItem("emailId") === null) {
            history.push("/signup");
        } else {
            history.push("/dashboard");
        }
    }, [localStorage.getItem("emailId")]);

    const [validate, setValidate] = useState({
        firstName: null,
        lastName: null,
        userName: null,
        email: null,
        phoneNo : null,
        password: null,
        errors: {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            phoneNo : '',
            password: '',
        }
    });

    const formData = useRef(null);


    const validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            // if we have an error string set valid to false
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }


    const handleChange = (event) => {
        event.preventDefault();
        const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

        // const phoneno = /^\d{10}$/;
        // at least one uppercase letter, one special character,
        // at least six characters
        var validPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");

        const { name, value } = event.target;
        let errors = validate.errors;

        switch (name) {
            case 'firstName':
                errors.firstName =
                    value.length < 1
                        ? 'Enter First Name!'
                        : '';
                break;
            case 'lastName':
                errors.lastName =
                    value.length < 1
                        ? 'Enter Last Name!'
                        : '';
                break;
            case 'userName':
                errors.userName =
                    value.length < 1
                        ? 'Enter User Name!'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'phoneNo':
                errors.phoneNo =
                    isNaN(value)
                        ? 'Please enter only digit.'
                        : value.length >10 ? 'Please enter only 10 digits number.' : '';
                break;
            case 'password':
                errors.password =
                    validPass.test(value)
                        ? ''
                        : 'Passwords must contain at least six characters, including one uppercase, one special chracter and numbers,strings.';
                break;
            default:
                break;
        }

        setValidate({ errors, [name]: value }, () => {
            console.log(errors)
        })
    }

    const fnError = validate.errors.firstName.length > 0 ? 'red' : '';
    const lnError = validate.errors.lastName.length > 0 ? 'red' : '';
    const emailError = validate.errors.email.length > 0 ? 'red' : '';
    const passError = validate.errors.password.length > 0 ? 'red' : '';
    const usnError = validate.errors.userName.length > 0 ? 'red' : '';
    const phoneError = validate.errors.phoneNo.length > 0 ? 'red' : '';

      console.log("errorsss",validate.errors.phoneNo)
    const formSubmit = (e) => {
        e.preventDefault();

        const [firstName, lastName, userName, email,phoneNo, password] = formData.current;

        if (validateForm(validate.errors)) {
            console.info('Valid Form')

        } else {
            console.error('Invalid Form')
        }
        const formDataObj = {
            "firstname": firstName.value,
            "lastname": lastName.value,
            "username": userName.value,
            "email": email.value,
            "password": password.value,
            'phoneno' : phoneNo.value,
        };
        console.log("formDataObj",formDataObj);



        if (firstName.value != '' && lastName.value != '' && userName.value != '' && email.value != '' && password.value != '' && phoneNo.value !='') {
            axios.post(process.env.REACT_APP_API_URL + '/register', {
                "firstname": firstName.value,
                "lastname": lastName.value,
                "username": userName.value,
                "email": email.value,
                'phone_no' : phoneNo.value,
                "password": password.value,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },

            }).then(response => {
                setSignUpMsg(response.status);
                setUniqEmailMsg(0);
                setAllFieldError(0);
                firstName.value = '';
                lastName.value = '';
                userName.value = '';
                email.value = '';
                phoneNo.value = '';
                password.value = '';

            }).catch(error => {
                console.log("error show")
                console.log(error.message);
                if (error.response.status == 400) {
                    setUniqEmailMsg(400);
                }
                setAllFieldError(0)
            })
        } else {
            setAllFieldError(450);
            setUniqEmailMsg(0);
            setSignUpMsg(0);
        }
    }



    return (
        <React.Fragment>
            <Header />
            <header className="header">
                <nav className="navbar navbar-expand-lg navbar-light py-3">
                    <div className="container">
                        {/* <a href="#" className="navbar-brand">
                            <img src="https://res.cloudinary.com/mhmd/image/upload/v1571398888/Group_1514_tjekh3_zkts1c.svg" alt="logo" width="150" />
                        </a> */}
                    </div>
                </nav>
            </header>

            <div className="container-fluid">
                <div className="row py-5 mt-4 align-items-center">
                    <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                        <img src={registerImg} alt="" class="img-fluid mb-3 d-none d-md-block" />
                        <h1>Create an Account</h1>
                        <p className="font-italic text-muted mb-0"></p>

                    </div>

                    <div className="col-md-6 col-lg-6 ml-auto">

                        {signUpMsg > 0 &&
                            <h2 style={{ color: 'green', textAlign: 'center' }}>
                                SignUp successfully.
                            </h2>
                        }

                        {allFieldError > 0 &&
                            <p style={{ color: 'red', textAlign: 'center' }}>
                                {'All field are required!.'}
                            </p>
                        }

                        <form onSubmit={(e) => formSubmit(e)} ref={formData}>
                            <div className="row">
                                <div className="input-group col-lg-6 mb-2" >
                                    <div className="input-group-prepend" >
                                        <span style={{ borderColor: fnError }} className="input-group-text bg-white border-md border-right-0"
                                        >
                                            <i className="fa fa-user text-muted"></i>
                                        </span>
                                    </div>
                                    <input id="firstName" type="text" style={{ borderColor: fnError }} name="firstName" onInput={(e) => handleChange(e)} placeholder="First Name" autocomplete="off" class="form-control bg-white border-left-0 border-md" />
                                </div>
                                {/*{validate.errors.firstName.length > 0 && 
                                    <div><span  className='error' style={{color:'red',paddingLeft: '20px'}}>{validate.errors.firstName}</span></div>
                                } */}
                                <div className="input-group col-lg-6 mb-2" >
                                    <div className="input-group-prepend" >
                                        <span style={{ borderColor: lnError }} className="input-group-text bg-white px-4 border-md border-right-0">
                                            <i className="fa fa-user text-muted"></i>
                                        </span>
                                    </div>
                                    <input id="lastName" style={{ borderColor: lnError }} type="text" name="lastName" onChange={(e) => handleChange(e)} placeholder="Last Name" autocomplete="off" class="form-control bg-white border-left-0 border-md" />
                                </div>
                                {/*{validate.errors.lastName.length > 0 && 
                                    <div><span className='error' style={{color:'red',paddingLeft: '20px'}}>{validate.errors.lastName}</span></div>
                                }*/}
                                <div className="input-group col-lg-12 mb-2">
                                    <div className="input-group-prepend">
                                        <span style={{ borderColor: usnError }} className="input-group-text bg-white px-4 border-md border-right-0">
                                            <i className="fa fa-user text-muted"></i>
                                        </span>
                                    </div>
                                    <input id="userName" style={{ borderColor: usnError }} type="text" name="userName" onChange={(e) => handleChange(e)} placeholder="User Name" autocomplete="off" class="form-control bg-white border-left-0 border-md" />
                                </div>
                                {/*{validate.errors.userName.length > 0 && 
                                    <div><span className='error' style={{color:'red',paddingLeft: '20px'}}>{validate.errors.userName}</span></div>
                                }*/}
                                <div className="input-group col-lg-12 mb-2">
                                    <div className="input-group-prepend">
                                        <span style={{ borderColor: emailError }} className="input-group-text bg-white px-4 border-md border-right-0">
                                            <i className="fa fa-envelope text-muted"></i>
                                        </span>
                                    </div>
                                    <input id="email" type="email" name="email" style={{ borderColor: emailError }} onChange={(e) => handleChange(e)} placeholder="Email Address" autocomplete="off" class="form-control bg-white border-left-0 border-md" />
                                </div>
                                {uniqEmailMsg == '400' ?
                                    <p style={{ color: 'red', paddingLeft: '20px' }}>
                                        The email has already been taken!.
                                    </p> : ''
                                }
                                <div className="input-group col-lg-12 mb-2">
                                    <div className="input-group-prepend">
                                        <span style={{ borderColor: phoneError }} className="input-group-text bg-white px-4 border-md border-right-0">
                                            <i className="fa fa-phone text-muted"></i>
                                        </span>
                                    </div>
                                    <input id="phone_no" type="text" name="phoneNo" style={{ borderColor: phoneError }} onChange={(e) => handleChange(e)} autocomplete="off" placeholder="Phone Number" class="form-control bg-white border-left-0 border-md" />
                                </div>
                                {validate.errors.phoneNo.length > 0 && 
                                    <div className="error_msg_margin"><span className='error' style={{color:'red',paddingLeft: '20px'}}>{validate.errors.phoneNo}</span></div>
                                }
                               
                                <div className="input-group col-lg-12 mb-2">
                                    <div className="input-group-prepend">
                                        <span style={{ borderColor: passError }} className="input-group-text bg-white px-4 border-md border-right-0">
                                            <i className="fa fa-lock text-muted"></i>
                                        </span>
                                    </div>
                                    <input id="password" type="password" name="password" style={{ borderColor: passError }} onChange={(e) => handleChange(e)} placeholder="Password" class="form-control bg-white border-left-0 border-md" />
                                </div>
                                {/*{validate.errors.password.length > 0 && 
                                    <div><span className='error' style={{color:'red',paddingLeft: '20px'}}>{validate.errors.password}</span></div>
                                }*/}

                                {/* <div class="input-group col-lg-6 mb-4">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-white px-4 border-md border-right-0">
                                            <i class="fa fa-lock text-muted"></i>
                                        </span>
                                    </div>
                                    <input id="passwordConfirmation" type="text" name="passwordConfirmation" placeholder="Confirm Password" class="form-control bg-white border-left-0 border-md" />
                                </div>
                                */}
                                <div className="form-group col-lg-12 mx-auto mb-0">
                                    {/* <a href="#" className="btn btn-primary btn-block py-2">
                                    </a>

                                      <span className="font-weight-bold">Create your account</span>*/}
                                    <button type="submit" className="btn btn-primary btn-block py-2 text-center text-white font-weight-bold" >Create your account</button>
                                </div>
                                <div className="text-center w-100">
                                    <p className="text-muted font-weight-bold" >Already Registered? <Link to="/login" className="btn btn-link text-primary" style={{ fontWeight: '700!important', color: '#dc3545!important' }}>Login</Link></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );

}

export default SignUp;