import React, { Component } from 'react';
import { round, maxBy } from 'lodash';

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

    _getMaximumAlcoholLevel() {
        return maxBy(this.props.premiles, function (p) {
            return p.getCurrentPremile();
        }).getCurrentPremile();
    }

    _renderTableRows() {
        var maximumLevel = this._getMaximumAlcoholLevel();

        return this.props.premiles.map(function renderRows(premile, index) {
            var currentPremile = round(premile.getCurrentPremile(), 3);
            var hoursSinceStart = premile.getHoursSinceDrinkingCommencing();
            var barWidth = round((currentPremile / maximumLevel) * 100);
            var style = {
                width: barWidth + '%'
            };

            return (
                <tr key={index}>
                    <td className="mdl-data-table__cell--non-numeric">{hoursSinceStart}</td>
                    <td><div className="premileBar mdl-color--accent" style={style}></div></td>
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
                            <th className="mdl-data-table__cell--non-numeric width-85p">Zawartość alkoholu we krwi</th>
                            <th></th>
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
