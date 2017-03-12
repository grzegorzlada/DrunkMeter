import BaseStore from './BaseStore';

const ALCOHOL_LIBRARY_KEY = 'SrunkMeter_Store_AlcoholLibrary';

export default class AlcoholLibraryStore extends BaseStore {

    constructor() {
        super(ALCOHOL_LIBRARY_KEY);
    }

    getAllAlcohols(alcoholsRetrieviedHandler) {
        return this.getAllData(alcoholsRetrieviedHandler);
    }

    saveNewAlcohols(alcohols) {
        this.saveNewData(alcohols);
    }

    getDefaultData() {
        return [
            {
                name: 'Standardowe piwo',
                volume: 500,
                alcohol: 5,
                locked: true
            },
            {
                name: 'Wódka',
                volume: 500,
                alcohol: 40,
                locked: true
            }
        ];
    }

}
