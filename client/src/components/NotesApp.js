import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


import Login from "../Login";
import PhotosList from '../photos/PhotosList';
import PhotoAlbumsList from '../photo-albums/PhotoAlbumsList';
import Dashboard from './Dashboard';
import FaqsList from '../faqs/FaqsList';
import SupportRequests from '../SupportRequests/index';
import {
    Camera, Activity, HelpCircle, Menu, LogOut, Book,
    Image, Phone
} from 'react-feather';

import {logoutUser, setLoggedInUser} from "../../actions/auth";
import {connect} from "react-redux";

/**
 * todo:
 * Fetch current user
 */

const BUSINESS_OWNER_ROOT_PATH = '/bo';

const NavBar = () => {
    return (
        <nav className="topnav navbar navbar-expand shadow navbar-light bg-white" id="sidenavAccordion">
            <a className="navbar-brand d-none d-sm-block" href="index.html">Admin</a>
            <button className="btn btn-icon btn-transparent-dark order-1 order-lg-0 mr-lg-2" id="sidebarToggle"
                    href="#">
                <Menu/>
            </button>
            <form className="form-inline mr-auto d-none d-lg-block">
                <input className="form-control form-control-solid mr-sm-2" type="search" placeholder="Search"
                       aria-label="Search"/>
            </form>
            <ul className="navbar-nav align-items-center ml-auto">
                <a className="dropdown-item" href="/logout">
                    Logout <LogOut/>
                </a>
            </ul>
        </nav>

    );
};

const SideBar = () => {
    return (

        <div id="layoutSidenav_nav">
            <nav className="sidenav shadow-right sidenav-light">
                <div className="sidenav-menu">
                    <div className="nav accordion" id="accordionSidenav">
                        <div className="sidenav-menu-heading">Management</div>

                        <Link to={`${BUSINESS_OWNER_ROOT_PATH}`} className={'nav-link'}>
                            <div className="nav-link-icon"><Activity/></div>
                            Dashboard
                        </Link>

                        <a
                            className="nav-link collapsed"
                            data-toggle="collapse"
                            data-target="#collapseLayouts"
                            aria-expanded="false"
                            aria-controls="collapseLayouts"
                            style={ {cursor: "pointer" } }
                        >
                            <div className="nav-link-icon"><Camera/></div>
                            Photos
                            <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i>
                            </div>
                        </a>

                        <div className="collapse" id="collapseLayouts" data-parent="#accordionSidenav">
                            <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavLayout">
                                <Link to={`${BUSINESS_OWNER_ROOT_PATH}/photos`} className={'nav-link'}>
                                    <div className="nav-link-icon"><Image/></div>
                                    All Photos
                                </Link>

                                <Link to={`${BUSINESS_OWNER_ROOT_PATH}/photo-albums`} className={'nav-link'}>
                                    <div className="nav-link-icon"><Book/></div>
                                    Albums
                                </Link>
                            </nav>
                        </div>

                        <Link to={`${BUSINESS_OWNER_ROOT_PATH}/support_requests`} className={'nav-link'}>
                            <div className="nav-link-icon"><Phone/></div>
                            Support Requests
                        </Link>

                        <Link to={`${BUSINESS_OWNER_ROOT_PATH}/faqs`} className={'nav-link'}>
                            <div className="nav-link-icon"><HelpCircle/></div>
                            FAQs
                        </Link>
                    </div>
                </div>
                <div className="sidenav-footer">
                    <div className="sidenav-footer-content">
                        <div className="sidenav-footer-subtitle">Logged in as:</div>
                        <div className="sidenav-footer-title"/>
                    </div>
                </div>
            </nav>
        </div>
    );
};

const NotesApp = ({logoutUser}) => {

    return (
        <Router>
            <div className={'nav-fixed'}>

                <NavBar/>

                <div id="layoutSidenav">

                    <SideBar/>

                    <div id="layoutSidenav_content">

                        <Switch>
                            <Route path={`${BUSINESS_OWNER_ROOT_PATH}`} exact={true}><Dashboard/></Route>
                            <Route path={`${BUSINESS_OWNER_ROOT_PATH}/photos`}><PhotosList/></Route>
                            <Route path={`${BUSINESS_OWNER_ROOT_PATH}/photo-albums`}><PhotoAlbumsList/></Route>
                            <Route path={`${BUSINESS_OWNER_ROOT_PATH}/faqs`}><FaqsList/></Route>
                            <Route path={`${BUSINESS_OWNER_ROOT_PATH}/support_requests`}><SupportRequests/></Route>
                            <Route path={`login`}><Login/></Route>
                        </Switch>

                        <footer className="footer mt-auto footer-light">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-6 small">Copyright &copy; My Transient House 2020</div>
                                    <div className="col-md-6 text-md-right small">
                                        <a href="#!">Privacy Policy</a>
                                        &middot;
                                        <a href="#!">Terms &amp; Conditions</a>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </Router>
    );

};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser()),
    }
};
// export default connect(null, mapDispatchToProps)(AdminApp);
export default NotesApp;
