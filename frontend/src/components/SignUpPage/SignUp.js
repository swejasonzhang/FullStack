import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';
import amazeon from '../images/amazeon.jpeg'
import './SignUp.css';

function SignUp () {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            
        setErrors([]);
        return dispatch(sessionActions.signup({ email, username, password }))
            .catch(async (res) => {
            let data;
            try {
                data = await res.clone().json();
            } catch {
                data = await res.text();
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
        });
        }
        return setErrors(['Re-enter password field must be the same as the password field']);
    };

    return (
        <>
            <img className="amazeonsignup" src={amazeon} alt='amazeonsignupmain'></img>

            <div className="signup-container">
                <h1 className="signupheader">Create account</h1>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error) => <li key={error}>{error}</li>)}
                    </ul>
                    <div className="signupform">
                        <label className='signupname'>Your name</label>
                        <input type="text" placeholder='Username here' onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="signupform">
                        <label className='signupemail'>Email</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />    
                    </div>
                    <div className="signupform">
                        <label className='signuppassword'>Password</label>
                        <input type="password" placeholder='At least 6 characters' onChange={(e) => setPassword(e.target.value)} required />
                    </div>
    
                    <div className="signupform">
                        <label className='signuprepassword'>Re-enter password</label>
                        <input type="password" id="repassword" name="repassword" onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <div className="signupform">
                        <button type="submit">Continue</button>
                    </div>

                    <div className='haveaccount'>
                        <p>Already have an account? <a href='http://localhost:3000/login'>Sign in</a></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp;