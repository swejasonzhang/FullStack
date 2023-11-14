import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import amazeon from '../images/amazeon.jpeg'
import './LoginPage.css';

function LoginPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username,setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ email, password }))
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
    };

    const createSubmit = (e) => {
        history.push('/signup');
    };

    const demoSubmit = (e) => {
        setUsername("demo")
        setEmail("demouser@gmail.com")
        setPassword("password")
        history.push('/')
    }
    
    return (
        <>
            <img className="amazeonlogin" src={amazeon} alt='amazeonloginmain'></img>
            <div className="login-container">
                <h1 className="loginheader">Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <div className="loginform">
                        <label className="loginemail">Email</label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="loginform">
                        <label className="loginpassword">Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="loginform">
                        <button type="submit">Continue</button>
                    </div>
                    <div className="demologin">
                        <button type="button" onClick={demoSubmit}>Demo Login</button>
                    </div>
                </form>
            </div>

            <div className="createaccount">
                <button type="button" onClick={createSubmit}>Create your amazon account</button>
            </div>
        </>
    );
}

export default LoginPage;