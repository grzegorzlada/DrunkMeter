import BaseStore from './BaseStore';

var SETTINGS_KEY = 'DrunkMeter_Store_Settings';

export default class SettingsStore extends BaseStore {
    constructor() {
        super(SETTINGS_KEY);
    }

    getSettings(settingsReveivedHandler) {
        this.getAllData(settingsReveivedHandler);
    }

    saveNewSettings(settings) {
        this.saveNewData(settings);
    }

    getDefaultData() {
        return {
            isSavingLocationEnabled: true,
            isSavingHistoryEnabled: true
        };
    }
}
