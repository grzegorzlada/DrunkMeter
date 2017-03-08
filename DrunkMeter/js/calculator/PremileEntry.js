export default class PremileEntry {
    constructor(hoursSinceDrinkingCommencing, currentPremile) {
        this.hoursSinceDrinkingCommencing = hoursSinceDrinkingCommencing;
        this.currentPremile = currentPremile;
    }

    getHoursSinceDrinkingCommencing() {
        return this.hoursSinceDrinkingCommencing;
    }

    getCurrentPremile() {
        return this.currentPremile;
    }
}
