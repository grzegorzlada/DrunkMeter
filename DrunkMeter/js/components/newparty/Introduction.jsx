import React, { Component } from 'react';
import {
    Card,
    CardTitle,
    CardText
} from 'react-mdl';

const propTypes = {
    height: React.PropTypes.number.isRequired,
    weight: React.PropTypes.number.isRequired,
    sex: React.PropTypes.string.isRequired
};

export default class Introduction extends Component {

    constructor(props) {
        super(props);
    }

    getSexString() {
        return this.props.sex === 'female' ? 'Kobieta' : 'Mężczyzna';
    }

    render() {
        return (
            <Card shadow={0} style={{
                width: '100%',
                margin: 'auto',
                marginBottom: 10
            }}>
                <CardTitle>Nowa impreza</CardTitle>
                <CardText>
                    <p>
                        Rozpoczynasz rejestrację nowej imprezy.
                    </p>
                    <p>Twoje dane: {this.getSexString()}, {this.props.height}cm wzrostu, {this.props.weight}kg wagi.</p>
                </CardText>
            </Card>
        );
    }
}

Introduction.propTypes = propTypes;
