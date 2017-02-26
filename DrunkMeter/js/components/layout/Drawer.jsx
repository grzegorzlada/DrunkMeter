import React from 'react';
import {Link} from 'react-router';

export default class Drawer extends React.Component {
    render() {
        return (
            <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                <header className="demo-drawer-header">
                    <span className="mdl-layout-title">Wirtualny alkomat</span>
                </header>
                <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
                    <Link to="/" className="mdl-navigation__link">
                        <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">apps</i>Podsumowanie</Link>
                    <Link to="/new-party" className="mdl-navigation__link">
                        <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">local_bar</i>Nowa impreza</Link>
                    <Link to="/history" className="mdl-navigation__link">
                        <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">history</i>Historia</Link>
                    <Link to="/quick-calculation" className="mdl-navigation__link">
                        <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">flash_on</i>Szybkie liczenie</Link>
                    <Link to="/library" className="mdl-navigation__link">
                        <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">list</i>Biblioteka alkoholi</Link>
                    <Link to="/settings" className="mdl-navigation__link">
                        <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">settings</i>Ustawienia</Link>
                    <div className="mdl-layout-spacer" />
                    <Link to="/help" className="mdl-navigation__link">
                        <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i>
                        <span className="visuallyhidden">Pomoc</span>
                    </Link>
                </nav>
            </div>
        );
    }
}
