import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import BasicPage from './components/layout/BasicPage';
import About from './components/pages/About';
import Home from './components/pages/Home';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={BasicPage}>
                    <IndexRoute component={Home} title="Home" />
                    <Route path="about" component={About} title="About" />
                    <Route path="*" component={Home} /> }
                </Route>
            </Router>
        );
    }
}

ReactDOM.render(
    <Main />, document.getElementById('main'));
