import React, { Component } from 'react';
import {
    Card,
    CardTitle,
    CardText
} from 'react-mdl';
import PremilesTable from './PremilesTable';
import PlusButton from '../inputs/PlusButton';
import AlcoholList from './AlcoholList';
import { calculatePremiles } from '../../calculator/Utilities';

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

    _renderPremileDistribution() {
        var premiles = calculatePremiles(this.props.personData, +this.props.partyDetails.stomachLevel, this.props.drunkAlcohol);
        var soberingTime = premiles.length - 1;
        if (soberingTime <= 0) {
            soberingTime = 0;
        }

        return (
            <div>
                <div>Będzisz trzeźwieć przez <strong> {soberingTime} </strong> godziny od rozpoczęcia picia.</div>
                <PremilesTable premiles={premiles} startTime={this.props.partyDetails.startTime} />
            </div>
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
