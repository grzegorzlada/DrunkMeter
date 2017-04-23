import React, { Component } from 'react';
import { find } from 'lodash';
import { Card, CardTitle, CardText } from 'react-mdl';
import moment from 'moment';

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

    _renderParty() {

    }

    _getCardTitle() {
        return this.state.partiesLoaded && typeof this.state.party !== 'undefined'
            ? 'Impreza z dnia: ' + moment(this.state.party.date).format('DD.MM.YYYY')
            : 'Historia imprezy';
    }

    _renderCardText() {
        if (!this.state.partiesLoaded) {
            return this._renderLoading();
        }

        if (typeof this.state.party === 'undefined') {
            return this._renderError();
        }

        return this._renderParty();
    }

    render() {
        return (
            <div>
                <Card shadow={0} style={{
                    width: '100%',
                    margin: 'auto',
                    marginBottom: 10
                }}>
                    <CardTitle>{this._getCardTitle()}</CardTitle>
                    <CardText>
                        {this._renderCardText()}
                    </CardText>
                </Card>
            </div>
        );
    }
}
