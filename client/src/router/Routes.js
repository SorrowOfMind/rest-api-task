import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import Page404 from '../components/Page404';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <Route path='*' component={Page404} />
        </Switch>
    )
}

export default Routes
