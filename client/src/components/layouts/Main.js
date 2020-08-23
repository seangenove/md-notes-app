import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, LogOut, ShoppingBag } from 'react-feather';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { logoutUser } from './../../actions/auth';

const MainLayout = ({ children, loggedInUser, logoutUser }) => {

    const toggleShowSidebar = () => {
        document.getElementById('mainBody').classList.toggle('sidenav-toggled');
    };

    return (
        <div>
            <div className="nav-fixed" id="mainBody">
                <Navbar toggleShowSidebar={toggleShowSidebar} logoutUser={logoutUser} />

                <div id="layoutSidenav">
                    <Sidebar loggedInUser={loggedInUser} />

                    <div id="layoutSidenav_content">
                        <main>
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Navbar = ({ toggleShowSidebar, logoutUser }) => {

    return (
        <nav className="topnav navbar navbar-expand shadow navbar-light bg-white" id="sidenavAccordion">
            <Link className="navbar-brand px-2" to="/">Notes App</Link>
            <button
                className="btn btn-icon btn-transparent-dark order-1 order-lg-0 mr-lg-2"
                id="sidebarToggle"
                href="#!"
                onClick={toggleShowSidebar}
            >
                <Menu />
            </button>
            
            <ul className="navbar-nav align-items-center ml-auto">
                <a
                    className="dropdown-item"
                    href="#!"
                    onClick={() => logoutUser()}
                >
                    Logout <LogOut />
                </a>
            </ul>
        </nav>
    )
}

const Sidebar = ({ loggedInUser }) => {
    return (
        <div id="layoutSidenav_nav">
            <nav className="sidenav shadow-right sidenav-light">
                <div className="sidenav-menu">
                    <div className="nav accordion">
                        <div className="sidenav-menu-heading">Management</div>

                        <a className="nav-link" href="#!">
                            <div className="nav-link-icon"><ShoppingBag /></div>
                            Notes
                            <div className="sidenav-collapse-arrow">
                                <FontAwesomeIcon icon={faAngleDown} className='fas fa-angle-down' />
                            </div>
                        </a>

                        <div className="collapse show">
                            <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                                <NavLink
                                    exact
                                    className="nav-link"
                                    activeClassName='active'
                                    to={`/notes`} 
                                >
                                    All Notes
                                </NavLink>

                                <NavLink
                                    exact
                                    className="nav-link"
                                    activeClassName='active'
                                    to={`/notes/create`}
                                >
                                    Add Note
                                </NavLink>
                            </nav>
                        </div>
                    </div>

                </div>
                <div className="sidenav-footer">
                    <div className="sidenav-footer-content">
                        {(loggedInUser.first_name || loggedInUser.last_name) && (
                            <div className="sidenav-footer-subtitle">
                                Logged in as: {`${loggedInUser.first_name} ${loggedInUser.last_name}`}
                            </div>
                        )}

                        <div className="sidenav-footer-title" />
                    </div>
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = state => ({
    loggedInUser: state.loggedInUser
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
