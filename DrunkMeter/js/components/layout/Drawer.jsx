import React from 'react';
import ReactDOM from 'react-dom';
import {FABButton, Icon} from 'react-mdl';
import {Router, Route, Link} from 'react-router';
import Header from './Header';
export default class Drawer extends React.Component {

    render() {
        return (
            <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                <header className="demo-drawer-header">
                    <img src="images/user.jpg" className="demo-avatar"/>
                    <div className="demo-avatar-dropdown">
                        <span>hello@example.com</span>
                        <div className="mdl-layout-spacer"></div>
                        <button id="accbtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                            <i className="material-icons" role="presentation">arrow_drop_down</i>
                            <span className="visuallyhidden">Accounts</span>
                        </button>
                        <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="accbtn">
                            <li className="mdl-menu__item">hello@example.com</li>
                            <li className="mdl-menu__item">info@example.com</li>
                            <li className="mdl-menu__item">
                                <i className="material-icons">add</i>Add another account...</li>
                        </ul>
                    </div>
                </header>
                <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
                    <a className="mdl-navigation__link" href="">
                        <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home</a>
                    <a className="mdl-navigation__link" href="">
                        <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Inbox</a>
                    <a className="mdl-navigation__link" href="">
                        <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete</i>Trash</a>
                    <a className="mdl-navigation__link" href="">
                        <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">report</i>Spam</a>
                    <a className="mdl-navigation__link" href="">
                        <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">forum</i>Forums</a>
                    <a className="mdl-navigation__link" href="">
                        <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">flag</i>Updates</a>
                    <a className="mdl-navigation__link" href="">
                        <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">local_offer</i>Promos</a>
                    <a className="mdl-navigation__link" href="">
                        <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">shopping_cart</i>Purchases</a>
                    <a className="mdl-navigation__link" href="">
                        <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">people</i>Social</a>
                    <div className="mdl-layout-spacer"></div>
                    <a className="mdl-navigation__link" href="">
                        <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i>
                        <span className="visuallyhidden">Help</span>
                    </a>
                </nav>
            </div>
        );
    }
}
