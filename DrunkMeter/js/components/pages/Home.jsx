import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {

    render() {
        return (
            <div>HELLO-HOME <Link to="/about">ABOUT</Link></div>

        );
    }
}
