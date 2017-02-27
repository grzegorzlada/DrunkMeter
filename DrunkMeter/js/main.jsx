import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import BasicPage from './components/layout/BasicPage';
import Summary from './components/pages/Summary';
import NewParty from './components/pages/NewParty';
import History from './components/pages/History';
import QuickCalculation from './components/pages/QuickCalculation';
import Library from './components/pages/Library';
import Settings from './components/pages/Settings';
import Help from './components/pages/Help';
import DrunkMeterStore from './DrunkMeterStore';


class Main extends React.Component {
    constructor(props) {
        super(props);
        window.DRUNKMETER = {};
        window.DRUNKMETER.DrunkMeterStore = new DrunkMeterStore();
        window.DRUNKMETER.DrunkMeterStore.startAsynchronousStoreInitialization();
    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={BasicPage}>
                    <IndexRoute component={Summary} title="Podsumowanie" />
                    <Route path="new-party" component={NewParty} title="Nowa impreza" />
                    <Route path="history" component={History} title="Historia imprez" />
                    <Route path="quick-calculation" component={QuickCalculation} title="Szybkie liczenie" />
                    <Route path="library" component={Library} title="Biblioteka alkoholi" />
                    <Route path="settings" component={Settings} title="Ustawienia" />
                    <Route path="help" component={Help} title="Pomoc" />
                    <Route path="*" component={Summary} /> }
                </Route>
            </Router>
        );
    }
}

ReactDOM.render(
    <Main />, document.getElementById('main'));
