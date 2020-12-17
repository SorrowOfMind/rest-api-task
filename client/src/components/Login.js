import React, {useRef, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import useInput from '../hooks/useInput';
import {logIn} from '../store/actions/authActions';
import '../styles/forms.css';

const Login = () => {
    const [email, connectEmail] = useInput('');
    const [password, connectPassword] = useInput('');
    const [errors, setErrors] = useState({});

    const auth = useSelector(state => state.auth.isAuth);
    const loginErr = useSelector(state => state.auth.loginError);
    const emailInput = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => emailInput.current.focus(), []);


    const areCredsValid = () => {
        let errors = {};
        let isValid = true;

        if (!email || !password){
            isValid = false;
            errors.empty = "Fields cannot remain empty!";
        }

        if (email){
            const regex = /^[A-Za-z0-9_.+-]{2,}@[A-Za-z0-9-]+\.[a-z]+$/;
            if (!regex.test(email)) {
                isValid = false;
                errors.email = 'Correct e-mail address required!';
            }
        }

        setErrors(errors);
        return isValid;
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (areCredsValid()){
            const creds = {email, password};
            dispatch(logIn(creds));
        }
    }

    if (auth) return <Redirect to="/dashboard"/>
    return (
        <div>
            <h1 className="text-center py-5 form-title">Log in</h1>
            <form className="form bg-dark form-login" autoComplete="off" onSubmit={handleSubmit}>
                <p className="error-backend">{loginErr}</p>
                <div className="mb-3 input-wrapper">
                    <p className="form-error form-error-empty">{errors.empty}</p>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" ref={emailInput} {...connectEmail.setInput}/>
                    <p className="form-error">{errors.email}</p>
                </div>
                <div className="mb-3 input-wrapper">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" {...connectPassword.setInput}/>
                </div>
                <button type="submit" className="btn btn-primary form-btn text-dark w-100 mt-5">Log in</button>
                <Link to="/register" className="form-link">Not a user? Register</Link>
            </form>
        </div>
    )
}

export default Login;
