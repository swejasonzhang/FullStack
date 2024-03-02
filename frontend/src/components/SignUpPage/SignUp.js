import React, { useState, } from 'react';
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
import './SignUp.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function SignUp () {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            
        setErrors([]);
        return dispatch(sessionActions.signup({ email, username, password }))
            .then(() => {
                if (errors.length === 0) {
                    history.push("/");
                }
            })
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
            <div className="amazeonsignupcontainer">
              <img className="amazeonsignup" src={"https://amazeon-seeds.s3.amazonaws.com/Logo+For+SignUp+And+Login.jpeg"} alt='amazeonsignupmain'></img>
            </div>

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
                        <p>Already have an account? <a href='/login'>Sign in</a></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp;