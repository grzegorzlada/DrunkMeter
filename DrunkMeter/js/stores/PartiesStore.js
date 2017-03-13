import BaseStore from './BaseStore';

const PARTIES_KEY = 'DrunkMeter_Store_Parties';

export default class PartiesStore extends BaseStore {
    constructor() {
        super(PARTIES_KEY);
        this.parametrizedHandlers = [];
    }

    getParties(partiesReceivedHandler) {
        return this.getAllData(partiesReceivedHandler);
    }

    saveParties(parties) {
        this.saveNewData(parties);
    }

    getEmptyCurrentParty() {
        return {
            userProfile: null,
            drunkAlcohol: [],
            date: null,
            drinkingTime: null,
            stomachLevel: 0
        };
    }

    getDefaultData() {
        return {
            current: this.getEmptyCurrentParty(),
            historical: []
        };
    }
}
