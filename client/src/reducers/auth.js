export default (state = {}, action) => {

    switch (action.type) {
        case 'INITIALIZE_USER':
            console.log("Reducer: INITIALIZE_USER");
            return {
                ...state,
                ...action.user,
            };

        case 'SET_TOKEN':
            console.log("Reducer: SET_TOKEN");
            return {
                ...state,
                access_token: action.access_token,
            };

        case 'LOGOUT_USER':
            console.log("Reducer: LOGOUT_USER");

            const newState = {};
            
            return newState;
        default:
            return state
    }
};
