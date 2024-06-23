import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch} from "react-redux";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './LoginPage.css';

function LoginPage() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();

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
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential: "Demouser@gmail.com", password: "Password" }))
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
    
    return (
        <>
            <div className="logincontainer">
                <div className="amazeonlogincontainer">
                    <img className="amazeonlogin" src="https://amazeon-seeds.s3.amazonaws.com/Logo+For+SignUp+And+Login.jpeg" alt='amazeonloginmain'></img>
                </div>

                <div className="login-container">
                    <h1 className="loginheader">Sign in</h1>
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

                    <div className="signin-lastlinebreak"></div>

                    <div className="signin-socials">Learn More About Me!
                        <div>
                            <a className="icon-link linkedin" href="https://www.linkedin.com/in/swejasonzhang">
                                <FontAwesomeIcon icon={faLinkedin} size="lg"/>
                            </a>

                            <a className="icon-link github" href="https://github.com/swejasonzhang">
                                <FontAwesomeIcon icon={faGithub} size="lg"/>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="divider">
                    <h5 className="divider-text">New to Amazeon?</h5>
                </div>

                <div className="createaccount">
                    <button type="button" onClick={createSubmit}>Create your Amazeon account</button>
                </div>

                <div className="end-divider"></div>

                <div className="ending">2023-2024, By Jason Zhang</div>
            </div>
        </>
    );
}

export default LoginPage;