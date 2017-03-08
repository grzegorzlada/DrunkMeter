export default class Calculator {
    constructor(personData, drunkAlcohol) {
        this.personData = personData;
        this.drunkAlcohol = drunkAlcohol;
    }

    getAlcoholPremiles() {
        var entries = [];
        var totalAlcoholVolume = this.getTotalAlcoholVolume();

        return entries;
    }

    getTotalAlcoholVolume() {
        var totalVolume = 0;
        this.drunkAlcohol.forEach(function(alcohol) {
            totalVolume += alcohol.getPureAlcoholVolumeInGrams();
        }, this);

        return totalVolume;
    }

    calculateAlcoholLevel(hoursSinceDrinkingCommenced) {
        return ;
    }


}
