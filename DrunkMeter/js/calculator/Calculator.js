import PremlieEntry from './PremileEntry';
import {
    ceil
} from 'lodash';

const ELIMINATION_SPEED = 0.12;

export default class Calculator {
    constructor(personData, drunkAlcohol, drinkingTime) {
        this.personData = personData;
        this.drunkAlcohol = drunkAlcohol;
        this.drinkingTime = drinkingTime;
    }

    getAlcoholPremiles() {
        var premileEntries = [];
        var hoursSinceDrinkingCommenced = 0;
        var totalPureAlcoholVolumeInGrams = this._getTotalPureAlcoholVolume();
        var initialAlcoholLevelInBlood = this._calculateBaseAlcoholLevel(totalPureAlcoholVolumeInGrams);
        var alcoholLevelInBlood = initialAlcoholLevelInBlood;

        premileEntries.push(new PremlieEntry(hoursSinceDrinkingCommenced, initialAlcoholLevelInBlood));

        while (alcoholLevelInBlood > 0) {
            hoursSinceDrinkingCommenced += 1;
            alcoholLevelInBlood = this._calculateAlcoholLevel(initialAlcoholLevelInBlood, hoursSinceDrinkingCommenced);
            if (alcoholLevelInBlood < 0) {
                alcoholLevelInBlood = 0;
            }

            premileEntries.push(new PremlieEntry(hoursSinceDrinkingCommenced, alcoholLevelInBlood));
        }

        this._shapeAlcoholLevelCurve(premileEntries);
        return premileEntries;
    }

    _getTotalPureAlcoholVolume() {
        var totalVolume = 0;
        this.drunkAlcohol.forEach(function sumAlcoholLevel(alcohol) {
            totalVolume += alcohol.getPureAlcoholVolumeInGrams();
        }, this);

        return totalVolume;
    }

    _calculateBaseAlcoholLevel(totalPureAlcoholVolumeInGrams) {
        var alcoholLevelInBlood = totalPureAlcoholVolumeInGrams / (this.personData.getWeight() * this.personData.getRfactor());
        var hoursRequiredToGetSober = this._calculateHoursRequiredToGetSober(alcoholLevelInBlood);
        var additionalTimeRequiredToGetSober = this.personData.getAdditionalTimeRequiredToGetSober();
        var increasedInitialAlcoholLevelInBlood = (hoursRequiredToGetSober + additionalTimeRequiredToGetSober) * ELIMINATION_SPEED;

        return increasedInitialAlcoholLevelInBlood;
    }

    _calculateAlcoholLevel(initialAlcoholLevel, hoursSinceDrinkingCommenced) {
        return initialAlcoholLevel - hoursSinceDrinkingCommenced * ELIMINATION_SPEED;
    }

    _calculateHoursRequiredToGetSober(alcoholLevelInBlood) {
        return ceil(alcoholLevelInBlood / ELIMINATION_SPEED);
    }

    _shapeAlcoholLevelCurve(premileEntries) {
        var peakIndex = this.drinkingTime;
        var peakValue = premileEntries[peakIndex].getCurrentPremile();
        var delta = peakValue / this.drinkingTime;

        for (var i = 0; i < peakIndex; i++) {
            var entry = premileEntries[i];
            var currentPremile = i * delta;
            entry.setCurrentPremile(currentPremile);
        }
    }
}
