import axios from "axios";
import Endpoints from "../config/Endpoints";
import configureStore from "../store/configureStore";

export const setLoggedInUser = user => {

    console.log("Action: INITIALIZE_USER");
    // console.log(user);

    return {
        type: 'INITIALIZE_USER',
        user,
    }
};

export const setToken = access_token => {

    console.log("Action: SET_TOKEN");

    return {
        type: 'SET_TOKEN',
        access_token,
    }
};

export const logoutUser = () => {

    console.log("Action: LOGOUT_USER");
    return {
        type: 'LOGOUT_USER',
        user: {},
    }

};

/**
 * @returns {function(*): Promise<AxiosResponse<T>>}
 */
export const initializeUser = () => {

    const store = configureStore();
    const state = store.getState();

    let apiToken = '';

    if (state.loggedInUser && state.loggedInUser.api_token) {
        apiToken = state.loggedInUser.api_token;
    }

    return (dispatch) => {

        return axios.get(`${Endpoints.INIT_USER}?api_token=${apiToken}`)
            .then(({data}) => {
                /**
                 * Success response
                 * set state data
                 */
                dispatch(setLoggedInUser(data));
            })
            .catch(error => {
                console.error(error);
                alert("There was an error while fetching requests");
            });
    }
};
