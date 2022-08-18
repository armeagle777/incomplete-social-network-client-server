import {Component} from 'react';
import navStyles from './navbar.module.css';
import {NavLink} from "react-router-dom";


class Navbar extends Component {
    render() {
        return (
            <nav className={navStyles.nav}>
                <div className="col-md-4">
                    <input className="form-control  input-md" placeholder="Search"/>
                </div>
                <NavLink to='/home' activeClassName={navStyles.active}>
                    <span className="glyphicon glyphicon-home"></span>
                    <span className="navText">Home</span>
                </NavLink>
                <NavLink to='/profile' activeClassName={navStyles.active}>
                    <span className="glyphicon glyphicon-user"></span>
                    <span className="navText">Profile</span>
                </NavLink>
                <NavLink to='/dialogs' activeClassName={navStyles.active}>
                    <span className="glyphicon glyphicon-envelope"></span>
                    <span className="navText">Messages</span>
                </NavLink>
                <NavLink to='/news' activeClassName={navStyles.active}>
                    <span className="glyphicon glyphicon-list"></span>
                    <span className="navText">News</span>
                </NavLink>
                <NavLink to='/music' activeClassName={navStyles.active}>
                    <span className="glyphicon glyphicon-music"></span>
                    <span className="navText">Music</span>
                </NavLink>
                <NavLink to='/settings' activeClassName={navStyles.active}>
                    <span className="glyphicon glyphicon-cog"></span>
                    <span className="navText">Settings</span>
                </NavLink>
            </nav>
        )
    }
}

export default Navbar;
