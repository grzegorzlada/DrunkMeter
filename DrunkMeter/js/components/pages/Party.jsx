import React, { Component } from 'react';
import { find } from 'lodash';
import { Button, Card, CardTitle, CardText } from 'react-mdl';
import { Link } from 'react-router';
import moment from 'moment';
import AlcoholList from '../newparty/AlcoholList';

export default class Party extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partiesLoaded: false,
            party: null
        };
    }

    componentWillMount() {
        DRUNKMETER.DrunkMeterStore.PartiesStore.getParties(this._partiesRetrievedFromStore.bind(this));
    }

    _partiesRetrievedFromStore(parties) {
        var party = find(parties.historical, { 'id': this.props.params.id });

        this.setState({
            partiesLoaded: true,
            party: party
        });
    }

    _renderError() {
        return (
            <div>Nie udało się załadować wybranej imprezy</div>
        );
    }

    _renderLoading() {
        return (
            <div>Ładowanie danych...</div>
        );
    }

    _getStomachLevelText(stomachLevel) {
        switch (stomachLevel) {
            case 0:
                return 'pusty żołądek';
            case 0.5:
                return 'w połowie pełny żołądek';
            default:
                return 'pełny żołądek';
        }
    }

    _getSexText(sex) {
        return sex === 'male' ? 'mężczyzny' : 'kobiety';
    }

    _renderParty() {
        var party = this.state.party;
        return (
            <div>
                <Card shadow={0} style={{
                    width: '100%',
                    margin: 'auto',
                    marginBottom: 10
                }}>
                    <CardTitle>{this._getCardTitle()}</CardTitle>
                    <CardText>
                        <p>Początek imprezy: {party.startTime}, koniec imprezy: {party.endTime}.</p>
                        <p>Wypito {party.drunkAlcohol.length} alkoholi na {this._getStomachLevelText(+party.userProfile.stomachLevel)}.</p>
                        <p>Obliczenia przeprowadzono dla {this._getSexText(party.userProfile.sex)} o wadze {party.userProfile.weight}kg i wzroście {party.userProfile.height}cm.</p>
                        <div className="align-right">
                            <Link to="/history"><Button accent>Wybierz inną imprezę</Button></Link>
                        </div>
                    </CardText>
                </Card>

                <Card shadow={0} style={{
                    width: '100%',
                    margin: 'auto',
                    marginBottom: 10
                }}>
                    <CardTitle>Wypite alkohole</CardTitle>
                    <CardText>
                        <AlcoholList alcohols={this.state.party.drunkAlcohol} />
                    </CardText>
                </Card>
            </div>
        );
    }

    _getCardTitle() {
        return this.state.partiesLoaded && typeof this.state.party !== 'undefined'
            ? 'Impreza z dnia: ' + moment(this.state.party.date).format('DD.MM.YYYY')
            : 'Historia imprezy';
    }

    render() {
        if (!this.state.partiesLoaded) {
            return this._renderLoading();
        }

        if (typeof this.state.party === 'undefined') {
            return this._renderError();
        }

        return this._renderParty();
    }
}
