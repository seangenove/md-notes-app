import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, layout: Layout, loggedInUser, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if ((Object.keys(loggedInUser).length === 0 && loggedInUser)) {
                return <Redirect to='/login' />
            } else {
                return (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                )
            }
        }}
    />
);  

const mapStateToProps = (state) => ({
    loggedInUser: state.loggedInUser
});

export default connect(mapStateToProps)(AuthRoute);