import {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {isAuth} from './store/actions/authActions';

import Navbar from './components/Navbar';
import Routes from './router/Routes';

function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(isAuth), [dispatch]);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes />
      </div>
    </Router>
  );
}

export default App;

