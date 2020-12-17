import React, {useRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import useInput from '../hooks/useInput';
import {signUp} from '../store/actions/authActions';
import '../styles/forms.css';

const Register = () => {
    const [email, connectEmail] = useInput('');
    const [password, connectPassword] = useInput('');
    const [password2, connectPassword2] = useInput('');
    const [errors, setErrors] = useState({});

    const emailInput = useRef(null);
    const auth = useSelector(state => state.auth.isAuth);
    const signupErr = useSelector(state => state.auth.signupError);
    const dispatch = useDispatch();

    useEffect(() => emailInput.current.focus(), []);

    const areCredsValid = () => {
        let errors = {};
        let isValid = true;

        if (!email || !password || !password2){
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

        if (password !== password2) {
            isValid = false;
            errors.password = 'Passwords do not match!';
        }

        setErrors(errors);
        return isValid;
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (areCredsValid()){
            const creds = {email, password, password2};
            dispatch(signUp(creds));
        } 
    }

    if (auth) return <Redirect to="/dashboard"/>

    return (
        <div>
            <h1 className="text-center py-5 form-title">Register</h1>
            <form className="form bg-dark form-register" onSubmit={handleSubmit} autoComplete="off">
                <p className="error-backend">{signupErr}</p>
                <div className="mb-5 input-wrapper">
                    <p className="form-error form-error-empty">{errors.empty}</p>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="email" 
                        name="email"
                        ref={emailInput}
                        {...connectEmail.setInput}
                    />
                    <p className="form-error">{errors.email}</p>
                </div>
                <div className="mb-5 input-wrapper">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" {...connectPassword.setInput}/>
                    <p className="form-error">{errors.password}</p>
                </div>
                <div className="mb-4 input-wrapper">
                    <label htmlFor="password2" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="password2" name="password2" {...connectPassword2.setInput}/>
                    <p className="form-error">{errors.password}</p>
                </div>
                <button type="submit" className="btn btn-primary form-btn text-dark w-100 mt-5">Register</button>
                <Link to="/login" className="form-link">Already a user? Log in</Link>
            </form>
        </div>
    )
}

export default Register;
