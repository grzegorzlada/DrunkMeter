const ALCOHOL_DENSITY = 0.79;

export default class Alcohol {
    /**
     * Creates an instance of Alcohol.
     * @param {number} volume Volume of alcohol in mililiters
     * @param {number} percentage Alcohol's strength in percentage (4.5, 12, etc)
     *
     * @memberOf Alcohol
     */
    constructor(volume, percentage) {
        this.volume = volume;
        this.percentage = percentage;
    }

    getPureAlcoholVolumeInGrams() {
        return (this.percentage / 100) * this.volume * ALCOHOL_DENSITY;
    }
}
