import React from 'react';
import {Link} from 'react-router';

export default class App extends React.Component {

    render() {
        return (
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">{this.props.title}</span>
                    <div className="mdl-layout-spacer"></div>
                    <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
                        <i className="material-icons">more_vert</i>
                    </button>
                    <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" htmlFor="hdrbtn">
                        <Link to="/help"><li className="mdl-menu__item">Pomoc</li></Link>
                        <Link to="/settings"><li className="mdl-menu__item">Ustawienia</li></Link>
                        <li className="mdl-menu__item">Oceń</li>
                    </ul>
                </div>
            </header>
        );
    }
}
