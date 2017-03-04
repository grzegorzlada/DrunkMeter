import LocalStorageRepo from './LocalStorageRepo';

var SETTINGS_KEY = 'DrunkMeter_Store_Settings';

export default class SettingsStore {
    constructor() {
        console.log('Settings store constructed');
        this.settings = null;
        this.repository = new LocalStorageRepo();
        this.settingsReceivedHandlers = [];
    }

    initializeSettingsStore() {
        console.log('Settings store initialization started');
        var settingsPromise = this.repository.retrieveData(SETTINGS_KEY);
        settingsPromise.then(this.settingsRetrieved.bind(this));
    }

    settingsRetrieved(settings) {
        console.log('Settings list received from promise');
        if (settings !== null) {
            this.settings = JSON.parse(settings);
        } else {
            this.settings = this.getDefaultsettings();
        }

        this.notifyAllHandlersAboutReceivedSettings();
    }

    notifyAllHandlersAboutReceivedSettings() {
        var handler = this.settingsReceivedHandlers.pop();
        while (handler) {
            handler(this.settings);
            handler = this.settingsReceivedHandlers.pop();
        }
    }

    getSettings(settingsReveivedHandler) {
        if (this.settings === null) {
            this.settingsReceivedHandlers.push(settingsReveivedHandler);
        } else {
            settingsReveivedHandler(this.settings);
        }
    }

    saveNewSettings(settings) {
        this.settings = settings;
        var settingsString = JSON.stringify(settings);
        var storePromise = this.repository.storeData(SETTINGS_KEY, settingsString);
        storePromise.then(this.settingsSaved);
    }

    settingsSaved(isSuccess) {
        console.log('Settings save complete: ' + isSuccess);
    }

    getDefaultsettings() {
        return {
            isSavingLocationEnabled: true,
            isSavingHistoryEnabled: true
        };
    }
}
