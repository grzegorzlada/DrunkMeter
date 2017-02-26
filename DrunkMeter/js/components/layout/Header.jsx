import React from 'react';
import {Link} from 'react-router';

export default class App extends React.Component {

    render() {

        return (
            <header className="demo-header mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">{this.props.title}</span>
                    <div className="mdl-layout-spacer"></div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                        <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
                            <i className="material-icons">search</i>
                        </label>
                        <div className="mdl-textfield__expandable-holder">
                            <label className="mdl-textfield__label" htmlFor="search">Enter your query...</label>
                            <input className="mdl-textfield__input" type="text" id="search"></input>
                        </div>
                    </div>
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
