import React from 'react';
import axios from 'axios';
import configureStore from './store/configureStore';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

// Components
import Login from './../src/components/auth/Login';
import Register from './../src/components/auth/Register';

axios.defaults.withCredentials = true;
const store = configureStore();

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
