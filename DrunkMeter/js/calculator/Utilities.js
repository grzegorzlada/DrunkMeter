import Alcohol from './Alcohol';
import PersonData from './PersonData';
import Calculator from './Calculator';
import moment from 'moment';
import {ceil} from 'lodash';

function getDrunkAlcoholForCalculatorFromDrunkAlcoholJson(drunkAlcohol) {
    var alcohols = [];

    drunkAlcohol.forEach(function iterateAlcohols(drunkItem) {
        var alcohol = new Alcohol(drunkItem.volume, drunkItem.alcohol);
        alcohols.push(alcohol);
    }, this);

    return alcohols;
}

function calculatePremiles(userProfile, stomachLevel, drunkAlcohol, partyStartTime, partyEndTime) {
    var personData = new PersonData(userProfile.weight, userProfile.height, userProfile.sex, +stomachLevel);
    var drunkAlcoholList = getDrunkAlcoholForCalculatorFromDrunkAlcoholJson(drunkAlcohol);
    var drinkingTime = _calculateDrinkingTime(partyStartTime, partyEndTime);
    var calculator = new Calculator(personData, drunkAlcoholList, drinkingTime);

    var premiles = calculator.getAlcoholPremiles();
    return premiles;
}

function _calculateDrinkingTime(startTime, endTime) {
    var now = moment();
    var start = moment(now.format('YYYY-MM-DD ') + startTime);
    var end = moment(now.format('YYYY-MM-DD ') + endTime);

    if (end.isBefore(start)) {
        end.add(1, 'd');
    }

    var duration = moment.duration(end.diff(start));

    return ceil(duration.asHours());
}

export {
    getDrunkAlcoholForCalculatorFromDrunkAlcoholJson,
    calculatePremiles
};
