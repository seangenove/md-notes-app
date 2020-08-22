import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {

    const persistedState = loadState();

    const store = createStore(
        combineReducers({
            loggedInUser: authReducer,
        }),
        persistedState,
        composeEnhancers(applyMiddleware(thunkMiddleware)),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    store.subscribe(() => {
        saveState(store.getState());
    });

    return store;
}

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('notes-state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};


const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('notes-state', serializedState);
    } catch (err) {
        // ignore write errors
    }
};
