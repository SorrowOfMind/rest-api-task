import {SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE, VERIFY_SUCCESS, VERIFY_FAILURE, LOG_OUT} from '../actions/types';

const initState = {
    isAuth: null,
    userId: null,
    signupError: null,
    loginError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuth: true,
                userId: action.payload.userId,
                signupError: null
            }
        case SIGNUP_FAILURE:
            return {
                ...state,
                isAuth: false,
                userId: null,
                signupError: action.payload,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                userId: action.payload.userId,
                loginError: null
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuth: false,
                userId: null,
                loginError: action.payload
            }
        case VERIFY_SUCCESS:
            return {
                ...state,
                isAuth: true,
                userId: action.payload.userId,
                loginError: null
            }
        case VERIFY_FAILURE:
            return {
                ...state,
                isAuth: false,
                userId: null,
                loginError: null
            }
        case LOG_OUT: 
            return {
                ...state,
                isAuth: false,
                userId: null,
                loginError: null,
                signupError: null
            }
        default:
            return state;
    }
}

export default authReducer;