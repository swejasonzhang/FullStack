import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import amazeon from '../images/amazeon.jpeg'
import './SignUp.css';

function SignUp () {
    const dispatch = useDispatch();


    return (
        <>
            <img className="amazeonsignup" src={amazeon} alt='amazeonmain'></img>

            <div className="signup-container">
                <h1>Create account</h1>
                <form className="signup-form">
                    <div className="form-group">
                        <label>Your name</label>
                        <input type="text" id="name" name="name"></input>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" id="email" name="email"></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" id="password" name="password"></input>
                    </div>
                    <div className="form-group">
                        <label>Re-enter password</label>
                        <input type="repassword" id="repassword" name="repassword"></input>
                    </div>
                    <div className="form-group">
                        <button type="submit">Continue</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp;