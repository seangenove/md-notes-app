import React from 'react';
import axios from 'axios';
import configureStore from './store/configureStore';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthRoute from './routing/AuthRoute';

// Layouts
import Main from './../src/components/layouts/Main';

// Components
import Login from './../src/components/auth/Login';
import Register from './../src/components/auth/Register';

// Notes components NotesForm
import NotesList from './../src/components/notes/NotesList';
import NotesForm from './../src/components/notes/NotesForm';

import './App.css';

axios.defaults.withCredentials = true;
const store = configureStore();

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />

                    <AuthRoute exact path='/' component={() => (<h1>Authenticated</h1>)} layout={Main}/>
                    <AuthRoute exact path='/notes' component={NotesList} layout={Main}/>
                    <AuthRoute exact path='/notes/create' component={NotesForm} layout={Main}/>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
