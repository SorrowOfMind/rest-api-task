import {SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGIN_FAILURE, VERIFY_SUCCESS, VERIFY_FAILURE, LOGIN_SUCCESS, LOG_OUT} from './types';

const ENDPOINT = 'http://localhost:5000';
export const signUp = ({email, password, password2}) => async dispatch => {
    const url = `${ENDPOINT}/api/auth/register`;
    try {
        const results = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, password2})
        });
        const jsonResults = await results.json();
        if (jsonResults.status === 'success') {
            localStorage.setItem('token', jsonResults.token);
            dispatch({type: SIGNUP_SUCCESS, payload: jsonResults});
        }
        else dispatch({type: SIGNUP_FAILURE, payload: jsonResults.message});
    } catch (err) {
        console.error(err.message);
    }
};

export const logIn = ({email, password}) => async dispatch => {
    const url = `${ENDPOINT}/api/auth/login`;
    try {
        const results = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });
        const jsonResults = await results.json();
        if (jsonResults.status === 'success') {
            localStorage.setItem('token', jsonResults.token);
            dispatch({type: LOGIN_SUCCESS, payload: jsonResults});
        } else dispatch({type: LOGIN_FAILURE, payload: jsonResults.message});
    } catch (error) {
        console.error(error.message);
    }
}

export const isAuth = async dispatch => {
    const url = `${ENDPOINT}/api/auth/verify`;
    try {
        const response  = await fetch(url, {
          method: "POST",
          headers: {token: localStorage.token}
      });
      const jsonResults = await response.json();
      if (jsonResults.status === "success") dispatch({type: VERIFY_SUCCESS, payload: jsonResults});
      else dispatch({type: VERIFY_FAILURE, payload: jsonResults.message});
    } catch (error) {
      console.log(error.message);
    }
}

export const logOut = dispatch => {
    localStorage.removeItem('token');
    dispatch({type: LOG_OUT, payload: 'Logged out successfully'});
}