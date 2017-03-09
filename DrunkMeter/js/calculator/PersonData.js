export default class PersonData {

    /**
     * Creates an instance of PersonData.
     * @param {number} weight weight in kilograms
     * @param {number} height height in centimeters
     * @param {string} sex Sex. male | female)
     * @param {number} stomachLevel Food level in stomach. 0 - empty | 0.5 - half-full | 1 - full
     *
     * @memberOf PersonData
     */
    constructor(weight, height, sex, stomachLevel) {
        this.weight = weight;
        this.height = height;
        this.sex = sex;
        this.stomachLevel = stomachLevel;

        this.calculateRfactor();
    }

    calculateRfactor() {
        if (this.sex === 'female') {
            this.rFactor = 0.31223 - 0.006446 * this.weight + 0.004466 * this.height;
        } else {
            this.rFactor = 0.31608 - 0.004821 * this.weight + 0.004632 * this.height;
        }
    }

    getRfactor() {
        return this.rFactor;
    }

    getStomachLevel() {
        return this.stomachLevel;
    }

    getWeight() {
        return this.weight;
    }

    getAdditionalTimeRequiredToGetSober() {
        switch (this.stomachLevel) {
        case 0:
            return 0.5;
        case 1:
            return 2;
        default:
            return 1;
        }
    }
}
