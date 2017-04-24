import Alcohol from './Alcohol';

function getDrunkAlcoholForCalculatorFromDrunkAlcoholJson(drunkAlcohol) {
    var alcohols = [];

    drunkAlcohol.forEach(function iterateAlcohols(drunkItem) {
        var alcohol = new Alcohol(drunkItem.volume, drunkItem.alcohol);
        alcohols.push(alcohol);
    }, this);

    return alcohols;
}

export { getDrunkAlcoholForCalculatorFromDrunkAlcoholJson };
