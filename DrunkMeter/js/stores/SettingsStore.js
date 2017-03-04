import LocalStorageRepo from './LocalStorageRepo';

var SETTINGS_LIST_KEY = 'DrunkMeter_Store_Settings';

export default class SettingsStore {
    constructor() {
        console.log('Settings store constructed');
        this.settingsList = null;
        this.repo = new LocalStorageRepo();
        this.settingsListReceivedHandlers = [];
    }

    initializeSettingsStore() {
        console.log('Settings store initialization started');
        var settingsListPromise = this.repo.retrieveData(SETTINGS_LIST_KEY);
        settingsListPromise.then(this.settingsListRetrieved.bind(this));
    }

    settingsListRetrieved(settingsList) {
        console.log('Settings list received from promise');
        if (settingsList !== null) {
            this.settingsList = settingsList;
        } else {
            this.settingsList = this.getDefaultSettingsList();
        }

        this.notifyAllHandlersAboutReceivedSettings();
    }

    notifyAllHandlersAboutReceivedSettings() {
        var handler = this.settingsListReceivedHandlers.pop();
        while (handler) {
            handler(this.settingsList);
            handler = this.settingsListReceivedHandlers.pop();
        }
    }

    getSettingsList(settingsListReceivedHandler) {
        if (this.settingsList === null) {
            this.settingsListReceivedHandlers.push(settingsListReceivedHandler);
        } else {
            settingsListReceivedHandler(this.settingsList);
        }
    }

    getDefaultSettingsList() {
        return {
            isSavingLocationEnabled: true,
            isSavingHistoryEnabled: true
        };
    }
}
