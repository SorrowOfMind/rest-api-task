import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => {
    const auth = useSelector(state => state.auth.isAuth);

    return (
        <>
            {auth ? 
                <Route {...rest} render={
                    props => <Component {...rest} {...props} />}
                /> :
                auth == null ?
                null :
                <Redirect to="/login" />
            }
        </>
    )
}

export default ProtectedRoute;