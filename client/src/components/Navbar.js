import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import '../styles/header.css';
import {Link} from 'react-router-dom';
import {logOut} from '../store/actions/authActions';

const Navbar = () => {
    const auth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();

    const handleLogOut = () => dispatch(logOut);

    return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark p-4 navbar-static-top">
                <div className="container">

                    <h1 className="title"><span className="title-todo">TODO</span>list</h1>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler"    aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse nav-list justify-content-end" id="navbarToggler">
                        <ul className="nav navbar-nav menu-auth">
                            {auth === false && 
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                            }
                            {auth === false &&
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                            }
                             {auth &&
                                <li className="nav-item">
                                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                </li>
                            }
                            {auth &&
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link" onClick={handleLogOut}>Logout</Link>
                                </li>
                            }
                        </ul>
                    </div>

                </div>
            </nav>
    )
}

export default Navbar;
