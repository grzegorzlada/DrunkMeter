import React from 'react';
import moment from 'moment';
import { Card, CardTitle, CardText } from 'react-mdl';
import { reverse } from 'lodash';
import { Link } from 'react-router';

export default class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            partiesLoaded: false,
            parties: []
        };
    }

    componentWillMount() {
        DRUNKMETER.DrunkMeterStore.PartiesStore.getParties(this._partiesRetrievedFromStore.bind(this));
    }

    _partiesRetrievedFromStore(parties) {
        this.setState({
            partiesLoaded: true,
            parties: reverse(parties)
        });
    }

    _renderLoadingScreen() {
        return (
            <div>Ładowanie danych...</div>
        );
    }

    _renderPartyRows() {
        return this.state.parties.historical.map((party, index) => {
            var partyDate = moment(party.date);

            return (
                <Link to={`party/${party.id}`} key={index}>
                    <li className="mdl-list__item mdl-list__item--three-line">
                        <span className="mdl-list__item-primary-content">
                            <i className="material-icons mdl-list__item-avatar">local_drink</i>
                            <span>{partyDate.format('DD.MM.YYYY')}</span>
                            <span className="mdl-list__item-text-body">
                                Koniec imprezy: {party.endTime}, {party.drunkAlcohol.length} wypitych alkoholi.
                        </span>
                        </span>
                        <span className="mdl-list__item-secondary-content">
                            <span className="mdl-list__item-secondary-action" href="#"><i className="material-icons">zoom_in</i></span>
                        </span>
                    </li>
                </Link>
            );
        });
    }

    _renderPartiesHistory() {
        return (
            <div>
                <ul className="demo-list-three mdl-list">
                    {this._renderPartyRows()}
                </ul>
            </div>
        );
    }

    render() {
        return (
            <Card shadow={0} style={{
                width: '100%',
                margin: 'auto',
                marginBottom: 10
            }}>
                <CardTitle>Historia imprez</CardTitle>
                <CardText>
                    {this.state.partiesLoaded ? this._renderPartiesHistory() : this._renderLoadingScreen}
                </CardText>
            </Card>
        );
    }
}
