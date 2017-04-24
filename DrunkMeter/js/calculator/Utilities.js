import Alcohol from './Alcohol';
import PersonData from './PersonData';
import Calculator from './Calculator';

function getDrunkAlcoholForCalculatorFromDrunkAlcoholJson(drunkAlcohol) {
    var alcohols = [];

    drunkAlcohol.forEach(function iterateAlcohols(drunkItem) {
        var alcohol = new Alcohol(drunkItem.volume, drunkItem.alcohol);
        alcohols.push(alcohol);
    }, this);

    return alcohols;
}

function calculatePremiles(userProfile, stomachLevel, drunkAlcohol) {
    var personData = new PersonData(userProfile.weight, userProfile.height, userProfile.sex, +stomachLevel);
    var drunkAlcoholList = getDrunkAlcoholForCalculatorFromDrunkAlcoholJson(drunkAlcohol);
    var drinkingTime = 2;
    var calculator = new Calculator(personData, drunkAlcoholList, drinkingTime);

    var premiles = calculator.getAlcoholPremiles();
    return premiles;
}

export {
    getDrunkAlcoholForCalculatorFromDrunkAlcoholJson,
    calculatePremiles
};