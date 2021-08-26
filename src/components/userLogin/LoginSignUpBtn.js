import React from "react";
import './../../App.css';
import {Link } from "react-router-dom";

const LoginSignUpBtn = () => {

    return (
        <div class="container">
            <div class="row">
                <div class="col-md-4 mr-2">
                    <button type="button" class="btn btn-lg btn-primary ">
                        <Link to='/login' className="text-white">Login</Link>
                    </button>
                </div>
                <div class="col-md-4 ml-3">
                    <button type="button" class="btn btn-lg  btn-primary">
                        <Link to='/signup' className="text-white">SignUp</Link>    
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginSignUpBtn;