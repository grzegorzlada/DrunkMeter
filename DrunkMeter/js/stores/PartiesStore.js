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
            drunkAlcohol: [],
            date: null,
            startTime: null,
            endTime: null,
            userProfile: {
                weight: 100,
                height: 100,
                stomachLevel: 0.5
            }
        };
    }

    getDefaultData() {
        return {
            current: this.getEmptyCurrentParty(),
            historical: []
        };
    }
}
