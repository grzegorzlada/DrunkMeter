import React, { Component } from 'react';
import {
    Button,
    Card,
    CardTitle,
    CardText
} from 'react-mdl';
import PlusButton from '../inputs/PlusButton';
import AlcoholList from './AlcoholList';
import Alcohol from '../../calculator/Alcohol';
import PersonData from '../../calculator/PersonData';
import Calculator from '../../calculator/Calculator'; 

const propTypes = {
    onEnterNewAlcoholModeClick: React.PropTypes.func,
    drunkAlcohol: React.PropTypes.array.isRequired,
    removeAlcoholFromListHandler: React.PropTypes.func,
    partyDetails: React.PropTypes.object.isRequired,
    personData: React.PropTypes.object.isRequired
};

export default class Calculation extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    addNewItemClick() {
        console.log('add item clicked.');
        if (typeof this.props.onEnterNewAlcoholModeClick === 'function') {
            this.props.onEnterNewAlcoholModeClick();
        }
    }

    removeAlcoholFromList(alcohol) {
        if (typeof this.props.removeAlcoholFromListHandler === 'function') {
            this.props.removeAlcoholFromListHandler(alcohol);
        }
    }

    _isPossibleToCalculatePremiles() {
        var partyDetails = this.props.partyDetails;
        var drunkAlcohol = this.props.drunkAlcohol;

        return partyDetails.startTime
            && partyDetails.endTime
            && partyDetails.stomachLevel
            && drunkAlcohol.length > 0;
    }

    _getDrunkAlcoholForCalculator() {
        var alcohols = [];

        this.props.drunkAlcohol.forEach(function iterateAlcohols(drunkItem) {
            var alcohol = new Alcohol(drunkItem.volume, drunkItem.alcohol);
            alcohols.push(alcohol);
        }, this);

        return alcohols;
    }

    _getCalculatedPremiles() {
        var personData = new PersonData(this.props.personData.weight, this.props.personData.height, this.props.personData.sex, +this.props.partyDetails.stomachLevel);
        var drunkAlcohol = this._getDrunkAlcoholForCalculator();
        var drinkingTime = 2;
        var calculator = new Calculator(personData, drunkAlcohol, drinkingTime);
        
        var premiles = calculator.getAlcoholPremiles();
        return premiles;
    }

    _renderPremileDistribution() {
        var premiles = this._getCalculatedPremiles();
        return (
            <div>Kalkulacja</div>
        );
    }

    _renderNotEnoughInformationNotification() {
        return (
            <div className="warning-container">
                <i className="material-icons">error</i>
                <p>
                    Aby dokonać kalkulacji musisz ustawić początek i koniec imprezy oraz wprowadzić wypite alkohole.
                </p>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Card shadow={0} style={{
                    width: '100%',
                    margin: 'auto',
                    marginBottom: 10
                }}>
                    <CardTitle>Wypite alkohole</CardTitle>
                    <CardText>
                        <AlcoholList title="Wypite alkohole"
                            alcohols={this.props.drunkAlcohol}
                            actionIcon="remove_circle"
                            actionHandler={(alcohol) => this.removeAlcoholFromList(alcohol)} />
                        <PlusButton onClick={() => this.addNewItemClick()} />
                    </CardText>
                </Card>

                <Card shadow={0} style={{
                    width: '100%',
                    margin: 'auto',
                    marginBottom: 10
                }}>
                    <CardTitle>Rozkład promili</CardTitle>
                    <CardText>
                        {this._isPossibleToCalculatePremiles() ? this._renderPremileDistribution() : this._renderNotEnoughInformationNotification()}
                    </CardText>
                </Card>
            </div>
        );
    }
}

Calculation.propTypes = propTypes;
