import React, { Component } from 'react';
import {
    Button,
    Card,
    CardTitle,
    CardText,
    Radio,
    RadioGroup
} from 'react-mdl';
import { Link } from 'react-router';
import TextField from '../inputs/TextField';

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
                    <h5>Twoje dane</h5>
                    {this.getSexString()}, {this.props.height}cm wzrostu, {this.props.weight}kg wagi.
                    <div className="align-right"><Link to="/settings"><Button accent>Zmień swoje dane</Button></Link></div>
                    
                    <h5 className="no-margin-bottom">Początek imprezy</h5>
                    <TextField label="Godzina" validationMessage="Nieprawidłowy format godziny" value=" " />
                    
                    <h5 className="no-margin-bottom">Koniec imprezy</h5>
                    <TextField label="Godzina" validationMessage="Nieprawidłowy format godziny" value=" " />
                    
                    <h5>Pożywienie</h5>
                    <RadioGroup name="food-status" value="" onChange={(e) => { }}>
                        <Radio value="empty" className="margin-right-50">Pusty żołądek</Radio>
                        <Radio value="half" className="margin-right-50">W połowie pełny żołądek</Radio>
                        <Radio value="full">Pełny żołądek</Radio>
                    </RadioGroup>
                </CardText>
            </Card>
        );
    }
}

Introduction.propTypes = propTypes;
