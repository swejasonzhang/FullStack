import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './SignUp.css';

function SignUp() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory("");

    const signuplogin = async (e) => {
        e.preventDefault();
        history.push('/login');
    }

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
                        <input type="text" placeholder='First and last name' onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div className="signupform">
                        <label className='signupemail'>Email</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="signupform">
                        <label className='signuppassword'>Password</label>
                        <input type="password" className="signuppasswordinput" placeholder='At least 6 characters' onChange={(e) => setPassword(e.target.value)} required />
                        <div className='characters'>Passwords must be at least 6 characters.</div>
                    </div>

                    <div className="signupform">
                        <label className='signuprepassword'>Re-enter password</label>
                        <input type="password" id="repassword" className="repassword" onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>

                    <div className="signupform">
                        <button type="submit">Continue</button>
                    </div>

                    <div className="message">By creating an account, you agree to being amazing and I hope you have a good day!</div>

                    <div className='linebreak'></div>

                    <div className='socials'>Learn More About Me!
                        <div>
                            <a className="icon-link linkedin" href="https://www.linkedin.com/in/swejasonzhang">
                                <FontAwesomeIcon icon={faLinkedin} size="lg"/>
                            </a>

                            <a className="icon-link github" href="https://github.com/swejasonzhang">
                                <FontAwesomeIcon icon={faGithub} size="lg"/>
                            </a>
                        </div>
                    </div>

                    <div className='lastlinebreak'></div>

                    <div className='haveaccount'>
                        <p>Already have an account? <a href="/login" onClick={signuplogin}>Sign in</a></p>
                    </div>
                </form>
            </div>

            <div className="signup-end-divider"></div>

            <div className="signup-ending">2023-2024, By Jason Zhang</div>
        </>
    )
}

export default SignUp;