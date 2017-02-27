import SettingsStore from './stores/SettingsStore';

export default class DrunkMeterStore {
    constructor() {
        console.log('Store initializing...');
        this.SettingsList = null;
    }

    startAsynchronousStoreInitialization() {
        var settingsStore = new SettingsStore();
        settingsStore.initializeSettingsList(this.settingsListInitialized.bind(this), this.storeInitializationError.bind(this));
    }

    settingsListInitialized(settingsList) {
        this.SettingsList = settingsList;
    }

    storeInitializationError(error) {
        console.log('STORE INIT ERROR: ' + error);
    }

    getSettingsList() {
        var that = this;
        return new Promise(function(resolve, reject) {
            resolve(that.SettingsList);
        });
    }
}
