import {Component} from 'react';
import headerStyles from './header.module.css';
import Logo from '../../assets/images/logo.svg';
import Navbar from "../navbar/Navbar";

class Header extends Component {
    render() {
        return (
            <header className={headerStyles.header}>
                <div className={headerStyles.headerContainer}>
                    <img src={Logo} alt=""/>
                    <Navbar/>
                </div>
            </header>
        )
    }
}

export default Header;
