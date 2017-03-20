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
    sex: React.PropTypes.string.isRequired,
    onPartyDetailsChange: React.PropTypes.func,
    partyDetails: React.PropTypes.object
};

export default class Introduction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startTime: '20:00',
            endTime: '22:00',
            stomachLevel: 0.5
        };
    }

    componentWillMount() {
        if (typeof this.props.partyDetails === 'undefined' || !this.props.partyDetails) {
            return;
        }

        this.setState({
            startTime: this.props.partyDetails.startTime,
            endTime: this.props.partyDetails.endTime,
            stomachLevel: this.props.partyDetails.stomachLevel
        });
    }

    componentWillReceiveProps(nextProps) {
        var currentPartyDetails = this.getPartyDetailsObject(this.state);
        var nextPartyDetails = nextProps.partyDetails;

        if (currentPartyDetails.startTime === nextPartyDetails.startTime
            && currentPartyDetails.endTime === nextPartyDetails.endTime
            && currentPartyDetails.stomachLevel === nextPartyDetails.stomachLevel) {
            return;
        }

        this.setState({
            startTime: nextPartyDetails.startTime,
            endTime: nextPartyDetails.endTime,
            stomachLevel: nextPartyDetails.stomachLevel.toString()
        });
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state !== nextState) {
            this.onPartyDetailsChange(nextState);
        }
    }

    getSexString() {
        return this.props.sex === 'female' ? 'Kobieta' : 'Mężczyzna';
    }

    onPartyDetailsChange(state) {
        if (typeof this.props.onPartyDetailsChange === 'function') {
            this.props.onPartyDetailsChange(this.getPartyDetailsObject(state));
        }
    }

    getPartyDetailsObject(state) {
        return {
            startTime: state.startTime,
            endTime: state.endTime,
            stomachLevel: state.stomachLevel
        };
    }

    startTimeChanged(data) {
        if (data.isValid) {
            this.setState({
                startTime: data.value
            });
        }
    }

    endTimeChanged(data) {
        if (data.isValid) {
            this.setState({
                endTime: data.value
            });
        }
    }

    onStomachLevelChange(e) {
        this.setState({
            stomachLevel: e.target.value
        });
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
                    <TextField label="Godzina"
                        pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
                        validationMessage="Nieprawidłowy format godziny"
                        value={this.state.startTime}
                        onChange={(data) => { this.startTimeChanged(data); }} />

                    <h5 className="no-margin-bottom">Koniec imprezy</h5>
                    <TextField label="Godzina"
                        pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
                        validationMessage="Nieprawidłowy format godziny"
                        value={this.state.endTime}
                        onChange={(data) => { this.endTimeChanged(data); }} />

                    <h5>Pożywienie</h5>
                    <RadioGroup name="food-status" value={this.state.stomachLevel} onChange={(e) => this.onStomachLevelChange(e)}>
                        <Radio value="0" className="margin-right-50">Pusty żołądek</Radio>
                        <Radio value="0.5" className="margin-right-50">W połowie pełny żołądek</Radio>
                        <Radio value="1">Pełny żołądek</Radio>
                    </RadioGroup>
                </CardText>
            </Card>
        );
    }
}

Introduction.propTypes = propTypes;
