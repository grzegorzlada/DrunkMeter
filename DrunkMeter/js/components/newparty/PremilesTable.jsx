import React, { Component } from 'react';
import { round, maxBy } from 'lodash';
import moment from 'moment';

const propTypes = {
    premiles: React.PropTypes.array.isRequired,
    startTime: React.PropTypes.string.isRequired
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
        var now = moment();
        var initialTime = moment(now.format('YYYY-MM-DD ') + this.props.startTime);

        return this.props.premiles.map(function renderRows(premile, index) {
            var currentPremile = round(premile.getCurrentPremile(), 3);
            var hoursSinceStart = premile.getHoursSinceDrinkingCommencing();
            var presentedHour = moment(initialTime);
            presentedHour.add(hoursSinceStart, 'h');
            var barWidth = round((currentPremile / maximumLevel) * 100);
            var style = {
                width: barWidth + '%'
            };
            

            return (
                <tr key={index}>
                    <td className="mdl-data-table__cell--non-numeric">{presentedHour.format('HH:mm')}</td>
                    <td className="mdl-data-table__cell--non-numeric"><div className="premileBar mdl-color--accent" style={style}></div></td>
                    <td>{currentPremile}</td>
                    <td>{hoursSinceStart}</td>
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
                            <th className="mdl-data-table__cell--non-numeric">Godzina</th>
                            <th className="mdl-data-table__cell--non-numeric width-85p">Zawartość alkoholu we krwi</th>
                            <th></th>
                            <th>Godzin od rozpoczęcia picia</th>
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
