import React from 'react';
import {useSelector} from 'react-redux';

const Home = () => {
    const auth = useSelector(state => state.auth.isAuth);
    return (
        <div>
            <h1 className="text-center py-5">
                {auth ? "Hello again! You may explore your dashboard." :
                auth == null ? null : "Welcome Stranger! Please log in before exploring your dashbord." }
            </h1>
        </div>
    )
}

export default Home;
