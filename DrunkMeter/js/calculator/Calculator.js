import PremlieEntry from './PremileEntry';

export default class Calculator {
    constructor(personData, drunkAlcohol) {
        this.personData = personData;
        this.drunkAlcohol = drunkAlcohol;
    }

    getAlcoholPremiles() {
        var entries = [];
        var totalAlcoholVolume = this.getTotalAlcoholVolume();
        var alcoholLevelInBlood = this.calculateAlcoholLevel(totalAlcoholVolume, 0);
        var hoursSinceDrinkingCommenced = 0;

        entries.push(new PremlieEntry(hoursSinceDrinkingCommenced, alcoholLevelInBlood));

        while (alcoholLevelInBlood > 0) {
            hoursSinceDrinkingCommenced += 1;
            alcoholLevelInBlood = this.calculateAlcoholLevel(totalAlcoholVolume, hoursSinceDrinkingCommenced);
            if (alcoholLevelInBlood < 0) {
                alcoholLevelInBlood = 0;
            }

            entries.push(new PremlieEntry(hoursSinceDrinkingCommenced, alcoholLevelInBlood));
        }

        return entries;
    }

    getTotalAlcoholVolume() {
        var totalVolume = 0;
        this.drunkAlcohol.forEach(function(alcohol) {
            totalVolume += alcohol.getPureAlcoholVolumeInGrams();
        }, this);

        return totalVolume;
    }

    calculateAlcoholLevel(alcoholVolume, hoursSinceDrinkingCommenced) {
        return alcoholVolume / (this.personData.getWeight() * this.personData.getRfactor()) - hoursSinceDrinkingCommenced * 0.12;
    }


}
