import PremlieEntry from './PremileEntry';
import { ceil } from 'lodash';

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
        var totalPureAlcoholVolumeInGrams = this.getTotalPureAlcoholVolume();
        var initialAlcoholLevelInBlood = this.calculateBaseAlcoholLevel(totalPureAlcoholVolumeInGrams);
        var alcoholLevelInBlood = initialAlcoholLevelInBlood;

        premileEntries.push(new PremlieEntry(hoursSinceDrinkingCommenced, initialAlcoholLevelInBlood));

        while (alcoholLevelInBlood > 0) {
            hoursSinceDrinkingCommenced += 1;
            alcoholLevelInBlood = this.calculateAlcoholLevel(initialAlcoholLevelInBlood, hoursSinceDrinkingCommenced);
            if (alcoholLevelInBlood < 0) {
                alcoholLevelInBlood = 0;
            }

            premileEntries.push(new PremlieEntry(hoursSinceDrinkingCommenced, alcoholLevelInBlood));
        }

        return premileEntries;
    }

    getTotalPureAlcoholVolume() {
        var totalVolume = 0;
        this.drunkAlcohol.forEach(function(alcohol) {
            totalVolume += alcohol.getPureAlcoholVolumeInGrams();
        }, this);

        return totalVolume;
    }

    calculateBaseAlcoholLevel(totalPureAlcoholVolumeInGrams) {
        var alcoholLevelInBlood = totalPureAlcoholVolumeInGrams / (this.personData.getWeight() * this.personData.getRfactor());
        var hoursRequiredToGetSober = this.calculateHoursRequiredToGetSober(alcoholLevelInBlood);
        var additionalTimeRequiredToGetSober = this.personData.getAdditionalTimeRequiredToGetSober();
        var increasedInitialAlcoholLevelInBlood = (hoursRequiredToGetSober + additionalTimeRequiredToGetSober) * ELIMINATION_SPEED;

        return increasedInitialAlcoholLevelInBlood;
    }

    calculateAlcoholLevel(initialAlcoholLevel, hoursSinceDrinkingCommenced) {
        return initialAlcoholLevel - hoursSinceDrinkingCommenced * ELIMINATION_SPEED;
    }

    calculateHoursRequiredToGetSober(alcoholLevelInBlood) {
        return ceil(alcoholLevelInBlood / ELIMINATION_SPEED);
    }


}
