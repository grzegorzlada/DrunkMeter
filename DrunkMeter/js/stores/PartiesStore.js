import BaseStore from './BaseStore';
import v4 from 'uuid/v4';

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
            id: v4(),
            drunkAlcohol: [],
            date: null,
            startTime: '20:00',
            endTime: '23:00',
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
