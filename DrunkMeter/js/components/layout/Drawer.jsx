import React from 'react';
import {Link} from 'react-router';

export default class Drawer extends React.Component {
    closeDrawer() {
        if (document.getElementById('drawer').classList.contains('is-visible')) {
            document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
        }
    }

    render() {
        return (
            <div id="drawer" className="mdl-layout__drawer">
                <span className="mdl-layout-title">Wirtualny alkomat</span>
                <nav className="mdl-navigation">
                    <Link to="/" className="mdl-navigation__link" onClick={() => this.closeDrawer()}>
                        <i className="material-icons" role="presentation">apps</i>Podsumowanie</Link>
                    <Link to="/new-party" className="mdl-navigation__link" onClick={() => this.closeDrawer()}>
                        <i className="material-icons" role="presentation">local_bar</i>Nowa impreza</Link>
                    <Link to="/history" className="mdl-navigation__link" onClick={() => this.closeDrawer()}>
                        <i className="material-icons" role="presentation">history</i>Historia</Link>
                    <Link to="/quick-calculation" className="mdl-navigation__link" onClick={() => this.closeDrawer()}>
                        <i className="material-icons" role="presentation">flash_on</i>Szybkie liczenie</Link>
                    <Link to="/library" className="mdl-navigation__link" onClick={() => this.closeDrawer()}>
                        <i className="material-icons" role="presentation">list</i>Biblioteka alkoholi</Link>
                    <Link to="/settings" className="mdl-navigation__link" onClick={() => this.closeDrawer()}>
                        <i className="material-icons" role="presentation">settings</i>Ustawienia</Link>
                    <div className="mdl-layout-spacer"/>
                    <Link to="/help" className="mdl-navigation__link" onClick={() => this.closeDrawer()}>
                        <i className="material-icons" role="presentation">help_outline</i>
                        <span className="visuallyhidden">Pomoc</span>
                    </Link>
                </nav>
            </div>
        );
    }
}
