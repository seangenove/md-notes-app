import axios from 'axios';
import _ from 'lodash';
import setAuthToken from '../utilities/setAuthToken';

/**
 *  Generic App API Request
 * @param {string} endpoint
 * @param {string } method
 * @param {function} onSuccess
 * @param {function} onError
 * @param {{}} data
 * @constructor
 */
export const AppApiRequest = async (endpoint, method, onSuccess, onError, data = {}) => {

    if (method.toUpperCase() === 'GET' && !_.isEmpty(data)) {
        // Convert data to query params
        // { a: b, c: d}  -----> /endpoint?a=b&c=d

        const queryParams = _.map(data, (value, key) => {
            return `${key}=${value}`;
        });

        if (queryParams.length > 0) {
            const queryStr = queryParams.join('&');
            endpoint = `${endpoint}?${queryStr}`;
            data = {};
        }

    }

    const state = JSON.parse(localStorage.getItem('notes-state'));

    if(state && state.loggedInUser.access_token) {
        setAuthToken(state.loggedInUser.access_token);
    }

    await axios({
        url: endpoint,
        method: method,
        data
    }).then(({ data }) => {

        if (_.isFunction(onSuccess)) {
            console.log('data', data);
            onSuccess(data);
        }
    }).catch((error) => {

        if (_.isFunction(onError)) {
            onError(error)
        }
    });
};
