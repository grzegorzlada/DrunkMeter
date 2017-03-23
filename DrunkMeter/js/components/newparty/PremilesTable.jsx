import React, { Component } from 'react';
import {round} from 'lodash';

const propTypes = {
    premiles: React.PropTypes.array.isRequired
};

export default class PremilesTable extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    _renderTableRows() {
        return this.props.premiles.map(function renderRows(premile, index) {
            var currentPremile = round(premile.getCurrentPremile(), 3);
            var hoursSinceStart = premile.getHoursSinceDrinkingCommencing();

            return (
                <tr key={index}>
                    <td className="mdl-data-table__cell--non-numeric">{hoursSinceStart}</td>
                    <td className="mdl-data-table__cell--non-numeric">{currentPremile}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div>
                <table className="mdl-data-table mdl-js-data-table">
                    <thead>
                        <tr>
                            <th className="mdl-data-table__cell--non-numeric">Godzin od rozpoczęcia picia</th>
                            <th className="mdl-data-table__cell--non-numeric">Zawartość alkoholu we krwi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this._renderTableRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

PremilesTable.propTypes = propTypes;
